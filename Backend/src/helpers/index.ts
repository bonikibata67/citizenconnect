import Joi from 'joi'
import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})
import ejs from 'ejs'




let config= {
 host: "smtp.gmail.com",
 service:"gmail",
 port:587,
 auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
 }
}


function createTransporter(config:any){
    return nodemailer.createTransport(config)
}


export async function sendEmail(messageOption:any){
    let transporter= createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err,info)=>{
        if(err){
            console.log(err);
            
        }

        console.log(info);
        
    })
}



export const RegisterSchema= Joi.object({
    Name:Joi.string().required(),
    Email: Joi.string().required().email().messages({
        'string.empty':'Please enter an Email',
        'string.email':"Please enter a valid email"
    }),
    Password:Joi.string().required().pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')
    )
})