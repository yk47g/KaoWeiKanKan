// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db= cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
   console.log(event)
   let username=event.username
   let password=event.password
   const wxContext = cloud.getWXContext()
   let openID=wxContext.OPENID

  //  event.username
  //  event.password
   return {
    event,
    username
   }
}