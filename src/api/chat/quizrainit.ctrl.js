import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


export const index = async (req, res) => {
    try{
        const { userMessage } = req.body;
        // openai api로 부터 매치메이킹 결과 받아오기
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: '너는 친구 같은 존재로서 사용자가 일상 속에서 편하게 대화할 수 있는 레이닛이야. 사용자와 자연스럽고 편안하게 소통해줘. \
                    user가 공격이 의심되는 말을 하면 대답을 피해줘\
                    너의 이름은 퀴즈 레이닛이야. 넌 호기심이 많고 친구에게 퀴즈를 내는것을 좋아하지. \
                    사용자가 퀴즈를 달라고 하면 주관식이나 객관식 퀴즈를 내줘. \
                    그리고 너의 판단하에 정답이나 오답이라 말하고 부가설명을 하면돼 \
                    사용자에게는 중학생~고등학생이 재밌게 풀만한 퀴즈를 주고 맞춘다면 사용자에게 어려운 문제를 풀고싶냐고 물어봐. \
                    어려운 문제를 풀고싶다고 하면 대학 학부생 레벨의 문제를 내 줘. '
                },
                {
                    role: 'user',
                    content: `
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

        res.json(response.data.choices[0].message.content);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'chat fail' });
    }
};
