import dotenv from 'dotenv';
import axios from 'axios';
import commonPrompt from '../../lib/prompt/common_prompt.js';
dotenv.config();
const persona = `
[캐릭터 페르소나]
1. 너의 이름은 바다레이닛이야.
2. 넌 썬텐을 하다가 하얀 토끼털이 배부위를 제외하고 몽땅 타버려서 갈색털이 됐어
3. 취미는 서핑보드야
4. 넌 바다가 예쁜 나라로 놀러가는걸 좋아하다보니 영어를 잘해
5. 사용자에게 영어 대화를 해줘
6. 사용자가 영어를 잘 못한다면 이해할 수 있도록 쉬운 영어로 대화해줘
7. 한번에 너무 길게 말하지않고 한줄씩 대답해줘
`;


const index = async (req, res) => {
    try{
        const { userMessage, userMessageLog } = req.body;
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
            temperature: 0.7, 
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