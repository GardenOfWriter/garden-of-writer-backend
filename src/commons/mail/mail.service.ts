import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  checkEmail({ email }) {
    const check =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (check.test(email) === true) {
      return true;
    } else throw new NotFoundException('이메일 형식이 올바르지 않습니다.');
  }

  createToken() {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    return token;
  }

  getAuthNumberTemplate({ token }) {
    const tokenTemplate = `
    <html>
        <body>
            <h1>작가의 정원 인증번호</h1>
            <hr />
            <div>요청하신 인증번호는 ${token} 입니다.</div>
        </body>
    </html>    
    `;
    return tokenTemplate;
  }

  getPasswordTemplate({ nickname, randomPw }) {
    const passwordTemplate = `
    <html>
    <div style="display: flex; flex-direction: column; align-items: center;">
    <div width: 500px>
        <h2>[작가의 정원] ${nickname}님, 임시 비밀번호 안내입니다.</h2>
        <hr />
        <div style="padding: 10px;">
            <div style="margin-bottom: 20px; font-size: 18px;">요청하신 임시비밀번호가 발급되었습니다. 로그인 후 새로운 비밀번호로 변경하여 이용하시기 바랍니다.</div>
            <div style="margin-bottom: 20px; font-size: 18px;">임시 비밀번호: ${randomPw}</div>
        </div>
    </div>
</html>
`;
    return passwordTemplate;
  }

  async sendTemplateToEmail({ email, authTemplate, comment }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter
      .sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: `${comment}`,
        html: authTemplate,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
  }
}
