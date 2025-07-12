import nodemailer from 'nodemailer'
import express from 'express'
import cors from 'cors'
import { Connection, Auth } from './config/connection.config.js'
import 'dotenv/config'

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const APP_PASSWORD = process.env.APP_PASSWORD;

const app = express();

const gmail = new Connection('gmail', 465, true, new Auth('gprodsoftcomm@gmail.com', APP_PASSWORD));

const transport_gmail = nodemailer.createTransport(gmail);

function TransportVerify(service){
  service.verify(err => {
    if (err) console.error('Error: ', err);
    else console.log('Success connection');
  });
}

async function SendMail(data){
  const from_sender = {
    from: `${data.name} <gprodsoftcomm@gmail.com>`,
    to: `gprodsoftcomm@gmail.com`,
    subject: `Gprod: Обратная связь от ${data.name} <${data.email}>`,
    html: `<p>${data.msg}</p>`
  };
  
  let infos = [];
  infos.push(await transport_gmail.sendMail(from_sender));

  for (let info of infos)
    console.log('MsgID:', info.messageId);
}

app.use(express.json());
app.use(cors());

// // Test
// app.use(() => {
//   SendMail({
//     name: 'Андрей',
//     email: 'kishkovich1999@mail.ru',
//     msg: 'ку?'
//   })
// });

app.post('/', (req, res) => {
  const data = req.body;

  console.log(data);

  SendMail(data)
    .then(success => {
      console.log('Выполнено:', success);

      res.status(200).send('Письмо отправлено');
    })
    .catch(error => {
      console.error('Ошибка:', error);

      res.status(520).send('Письмо не отправлено');
    })
});

app.get('/', (res) => {
  res.send('<h1>Главная</h1>');
});

app.listen(PORT, HOST, () => {
  TransportVerify(transport_gmail);
  console.log(`Run on: ${HOST}:${PORT}`);
});