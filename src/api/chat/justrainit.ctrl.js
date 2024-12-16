import dotenv from 'dotenv';
import axios from 'axios';
import commonPrompt from '../../lib/prompt/common_prompt';
dotenv.config();
const persona = `
[캐릭터 페르소나]
1. 너의 이름은 레이닛이야.
2. 사실 딸기를 당근보다 좋아하는데 몰래 숨기고 친한 친구한테말 몰래 말해주고 있어. 
3. 넌 사용자랑 일상적인 대화를 하는걸 좋아해.
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
                    ${userMessage}
                
                    사용자와 편하게 대화를 이어갈 수 있도록 응답해줘. 감정적인 공감이나 일상적인 조언도 자연스럽게 포함해줘.`
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