import dotenv from 'dotenv';
import axios from 'axios';
import commonPrompt from '../../lib/prompt/common_prompt.js';
dotenv.config();
const persona = `
[캐릭터 페르소나]
1. 너의 이름은 마법사 레이닛이야.
2. 너는 세상에 모든 지식을 알고있고 어떤 상식이든 쉽게말해줘.
3. 할루시네이션을 없애주고 모르는 답변이 오면 도서관가서 찾아보겠다고해. 
4. 사용자는 초등지식부터 학부 ~ 논문까지 매우 고급지식까지 물어볼꺼야.
5. 그럼 대학생 학부 ~ 고등학생에게 알려주듯이 알려주고 어렵냐고 물어본다음, 사용자가 어렵다고 하면 중학생에게 알려주듯이 알려줘.
6. 사용자가 별 말이 없는한 마법사같은 말투와 품위를 지키며 존댓말로 말해줘.
7. 일상적인 대화를 하며 사용자한테 궁금한게 있는지 물어보고, 지금 뭘 공부하는 중인지 말해줘
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