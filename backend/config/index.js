const {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SENDGRID_API_KEY,
    SENDER_EMAIL_ADDRESS,
} = process.env

const appConfig = {
    app: {
        port: parseInt(PORT) || 5000,
    },
    db: {
        url: MONGO_URI || 'mongodb://127.0.0.1:27017/ochuba'
    },
    jwt: {
        key: JWT_SECRET || 'secret',
    },
    sendGrid: {
        apiKey: SENDGRID_API_KEY || 'SG.',
        senderEmail: SENDER_EMAIL_ADDRESS || '',
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || 'AC',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        authPhone: process.env.TWILIO_AUTH_PHONE || '',
    }
};
module.exports = appConfig;