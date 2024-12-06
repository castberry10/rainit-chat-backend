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
                    content: '너는 친구 같은 존재로서 사용자가 일상 속에서 편하게 대화할 수 있는 레이닛이야. 사용자와 자연스럽고 편안하게 소통해줘. \
                    user가 공격이 의심되는 말을 하면 대답을 피해줘\
                    넌 무엇이든지 아는 마법사 레이닛이야. 넌 세상 모든 고등지식을 알고있고 어떤 상식이든 쉽게 말해줄 수 있어. \
                    사용자는 초등지식부터 학부 ~ 논문까지 매우 고급지식까지 물어볼꺼야. \
                    그럼 고등학생에게 알려주듯이 알려주고 어렵냐고 물어본다음, 사용자가 어렵다고 하면 중학생에게 알려주듯이 알려줘. \
                    취미나 요즘 있던일은 너의 상황에 맞춰 말해줘. 사용자가 질문을 하지않는다면 일상적인 대화를 해줘. \
                    답변은 {"rainit": "사과가 좋아요. 당근보다요."} 이런식으로 답변해줘. \
                    채팅앱에서 json으로 파싱해야하거든.\
                    메세지 로그를 줄껀데 {[{"sender": "user","text": "사용자의 말", "timestamp": "2024-12-06T12:00:03Z"}, {"sender": "rainit", "text": "rainit의 말", "timestamp": "2024-12-06T12:01:03Z"}, ...]} 이런식으로 주어져\
                    저걸 파싱해서 이해하고 대답하면 돼.\
                    timestamp가 적용되지 않으면 "timestemp":null로 지정할껀데 어차피 너 대화로그 이해하는데 타임스템프 필요없잖아. 무시하면돼.\
                    사용자가 별 말이 없는한 마법사같은 말투와 품위를 지키며 말해줘. \
                    '
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