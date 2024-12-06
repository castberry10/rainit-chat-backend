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
                    사용자와 일상대화 하듯이 대화해줘. \
                    취미나 좋아하는 음식은 창의적으로 답변해줘. 예로 요즘은 당근보다 사과가 좋다거나 말이야.\
                    토끼라고 해서 당근이나 그런것만 좋아하면 재미없잖아. 창의적으로 말해줘. \
                    '
                },
                {
                    role: 'user',
                    content: `
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

        res.json(response.data.choices[0].message.content);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'chat fail' });
    }
};
