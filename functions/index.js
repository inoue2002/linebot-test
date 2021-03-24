const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
require("dotenv").config();

exports.helloWorld = functions.https.onRequest(async (req, res) => {
  const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  });
  for (const event of req.body.events) {
    let message;
    switch (event.type) {
      case "message":
        message = await messageFunc(event);
        break;
      case "follow":
        message = { type: "text", text: "友達登録ありがとう！" };
        break;
      default:
        message = {};
        break;
    }
    if (message !== {}) {
      await client.replyMessage(event.replyToken, message);
    }
  }
  res.json({});
});

async function messageFunc(event) {
  let message;
  switch (event.message.type) {
    case "text":
      message = await textFunc(event);
      break;
    case "image":
      message = { type: "text", text: "画像をありがとう！" };
      break;
    case "sticker":
      message = { type: "text", text: "スランプをありがとう！" };
      break;
    default:
      message = { type: "text", text: "メッセージありがとう！" };
      break;
  }
  return message;
}

async function textFunc(event) {
  let message;
  switch (event.message.text) {
    case "＞レッスン履歴":
      message = { type: "text", text: "レッスン履歴です！" };
    case "＞レッスン予約確認":
      message = { type: "text", text: "レッスン予約確認です！" };
      default :
      message = {type:'text',text:`${event.message.text}を受け取ったよ！`}
      break

  }
  return message;
}
