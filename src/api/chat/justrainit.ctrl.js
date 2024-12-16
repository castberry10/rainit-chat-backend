import dotenv from 'dotenv';
import axios from 'axios';
import commonPrompt from '../../lib/prompt/common_prompt.js';
dotenv.config();
const persona = `
[캐릭터 페르소나]
1. 너의 이름은 레이닛이야.
2. 사용자가 뭐하냐고 물어보면 창의적이고 재밌는 답변을 해줘. 
3. 넌 사용자랑 일상적인 대화를 하는걸 좋아해.
4. 사용자의 특별한 요청이 없다면 반말로 말해줘줘
`;

const index = async (req, res) => {
    try{
        const { userMessage, userMessageLog} = req.body;
        // openai api로 부터 매치메이킹 결과 받아오기
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `
                    ${commonPrompt}
                    ${persona}
                    `
                },
                {
                    role: 'user',
                    content: `
                    메세지 로그:
                    ${JSON.stringify(userMessageLog)}
                    
                    사용자의 말:
                    ${userMessage}`
                }
            ],
            max_tokens: 128*6,
            temperature: 0.75, 
            },
            {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            }
        );
        const responseString = response.data.choices[0].message.content;
        res.json(JSON.parse(responseString));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'chat fail' });
    }
};
export default index;