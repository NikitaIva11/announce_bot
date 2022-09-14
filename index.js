const express = require('express')
const app = express()
const cors = require('cors')
const TelegramBot = require('node-telegram-bot-api');
const userDataService = require('./service/userDataService');

const port = process.env.PORT || '2700'



const token = process.env.TOKEN;


app.use(express.json())
app.use(cors())
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/start/, async (msg) => {   
     const chatId = msg.chat.id;
     console.log();
     const resp = await userDataService.postUser(msg.from.id)
     bot.sendMessage(chatId, resp);
   });
app.post('/announce', async (req, res) => {
     const users = await userDataService.allUsers;
     const date = new Date();
     const {inputElem,browserInfo,link} = req.body
     const str = `*Время*:_${date.toLocaleTimeString()}/${date.toDateString()}_;\n*Информация о систсеме*:_${browserInfo}_;\n${link?'*Публичная сылка*:_'+link+'_;\n':''}*Елементы*:_${JSON.stringify(inputElem,null,'\t')}_`
     users.forEach(el=>{
          bot.sendMessage(el.id,str,{parse_mode: 'Markdown'})
     })
     res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})