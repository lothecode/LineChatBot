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

  switch (event.message.text) {
    case 'LSD':
      event.reply(`${event.message.text} 至少要跑12K`)
      break
    case '今天跑多少':
      event.reply('今天跑個6K吧~')
      break
    case 'hello':
      event.reply('Hello 你是在哈囉什麼? 快去跑步！')
      break
    case '天氣':
      event.reply('別管天氣了，跑者是防風防水的！')
      break
    default:
      event.reply('不要再說了，我肚子好餓！')
  }

})

app.post('/', linebotParser)
app.get('/', (req, res) => {
  res.send(`<H1>Hi LineBOT</h1>`)
})

// 用自己的server就這麼寫, 否則用bot.listen
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server for LineBOT start')
})
