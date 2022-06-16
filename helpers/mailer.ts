
import  * as nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer'
import config from "../config/config"
import logger from '../logger/logger'
import {SMTPClient} from "emailjs"



const mailTransport = nodemailer.createTransport({
    host: "smtp.freesmtpservers.com",
    port: 25,
    logger:true,
    debug:true
})
export const sendMail = async (mailOptions: Options) => {
    try {
      const {messageId}= await mailTransport.sendMail({
           ...mailOptions
        })
       logger.info(mailTransport)
    } catch (error) {
        logger.error(mailTransport)
    }
}
