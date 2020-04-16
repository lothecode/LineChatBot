const express = require('express')
const app = express()
const linebot = require('linebot')

// 判別開發環境, 如果不是 production 模式, 使用 dotenv 讀取 .env 檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const linebotParser = bot.parser()

bot.on('message', function (event) { // event.message.text是使用者傳給bot的訊息
  console.log(event)

  let replyMsg = `Hello你剛才說的是:${event.message.text}`
  event.reply(replyMsg).then(function (data) { //將訊息回傳給使用者
    // success 
  }).catch(function (error) {
    // error 
  })
})

app.post('/', linebotParser)
app.get('/', (req, res) => {
  res.send(`<H1>Hi LineBOT</h1>`)
})

// Bot所監聽的webhook路徑與port
bot.listen(process.env.PORT || 3000, () => {
  console.log('LineBOT 已經準備好了')
})


app.listen(process.env.PORT || 3000, () => {
  console.log('APP is running on express')
})
