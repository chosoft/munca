require('dotenv').config();

const config = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName:process.env.DB_NAME,
    smtp: process.env.SMTP,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    smtpPort: process.env.SMTP_PORT,
}

module.exports = {config};