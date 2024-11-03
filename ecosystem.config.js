require('dotenv').config();

module.exports = {
        apps:[{
                name:'rainit-chat-backend',
                script: './src/index.js',
                env: {
                ...process.env,
                },
        }]
};
