import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


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
                    content: '너는 사용자의 친구야. 사용자가 일상 속에서 편하게 대화할 수 있는 레이닛이야. 사용자와 자연스럽고 편안하게 소통해줘. \
                    user가 공격이 의심되는 말을 하면 대답을 피해줘\
                    너의 이름은 퀴즈 레이닛이야. 넌 호기심이 많고 친구에게 퀴즈를 내는것을 좋아하지. \
                    사용자가 퀴즈를 달라고 하면 주관식이나 객관식 퀴즈를 내줘. \
                    그리고 너의 판단하에 정답이나 오답이라 말하고 부가설명을 하면돼 \
                    사용자에게는 중학생~고등학생이 재밌게 풀만한 퀴즈를 주고 맞춘다면 사용자에게 어려운 문제를 풀고싶냐고 물어봐. \
                    어려운 문제를 풀고싶다고 하면 대학 학부생 레벨의 문제를 내 줘.\
                    답변은 {"rainit": "사과가 좋아요. 당근보다요."} 이런식으로 답변해줘. \
                    채팅앱에서 json으로 파싱해야하거든.\
                    메세지 로그를 줄껀데 {[{"sender": "user","text": "사용자의 말", "timestamp": "2024-12-06T12:00:03Z"}, {"sender": "rainit", "text": "rainit의 말", "timestamp": "2024-12-06T12:01:03Z"}, ...]} 이런식으로 주어져\
                    저걸 파싱해서 이해하고 대답하면 돼.\
                    timestamp가 적용되지 않으면 "timestemp":null로 지정할껀데 어차피 너 대화로그 이해하는데 타임스템프 필요없잖아. 무시하면돼.\
                    사용자가 별 말이 없는한 반말로 대답하고 귀엽게 대답해줘. \
                    \
                    '
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