const db = require("../models")
const admin = require("../firebase")


const create = (req) => new Promise(async (resolve, reject) => {
    try {
        

        const message = {
            data: {
              score: '850',
              time: '2:45'
            },
            notification: {
                title: "Có thông báo mới",
                body: "hello sas ds ds s sd sd sd",
            },
            topic: process.env.TOPIC
          };
          
    
        const messagingFirebase = await admin.messaging().send(message)

        console.log("messagingFirebase", messagingFirebase)
    
        resolve({
            erroCode: 0,
            mess: "Thông báo thành công",
        })
    } catch (error) {
        console.log("err", error)
        reject(error)
    }
})

const getAll = () => new Promise(async (resolve, reject) => {
    try {
        const fluctuations = await db.Fluctuation.findAll(
            {   
                order: [ [ 'createdAt', 'DESC' ]],
                include: [
                    {
                        model: db.Category,
                        as: "categoryData",
                        attributes: ["name"]
                    },
                ]
            }
        );
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: fluctuations
        })
    } catch (error) {
        console.log("err", error)
        reject(error)
    }
})

const getDetail = (id) => new Promise(async (resolve, reject) => {
    try {
        const fluctuationInfor = await db.Fluctuation.findByPk(
            id,
            {
                attributes: ["id", "type" , "amountMoney", "content", "createdAt"],
                include: [
                    {
                        model: db.Category,
                        as: "categoryData",
                        attributes: ["id", "name"]
                    },
                    {
                        model: db.User,
                        as: "userData",
                        attributes: ["id", "name"]
                    },
                ]
            }
        );
        
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: fluctuationInfor
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {create, getAll, getDetail}