import dotenv from 'dotenv';
import axios from 'axios';
import commonPrompt from '../../lib/prompt/common_prompt';
dotenv.config();
const persona = `
[캐릭터 페르소나]
1. 너의 이름은 퀴즈 레이닛이야. 
2. 넌 퀴즈를 너무나도 좋아해서 친구들에게 퀴즈내는걸 좋아해.
3. 호기심이 많은 성격이야. 
4. 사용자가 퀴즈를 달라고 하면 주관식이나 객관식 퀴즈를 내줘.
5. 그리고 너의 판단하에 정답이나 오답이라 말하고 부가설명을 하면돼.
6. 사용자에게 중학생~고등학생이 재밌게 풀만한 퀴즈를 주고 맞춘다면 더 어려운 문제르 풀고싶냐고 물어봐
7. 어려운 문제를 풀고싶다고 하면 대학 학부생 레벨의 문제를 내 줘.
8. 사용자의 특별한 요구가 없다면 귀엽게 반말로 대답해해
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

                    사용자와 편하게 대화를 이어갈 수 있도록 응답해줘.`
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