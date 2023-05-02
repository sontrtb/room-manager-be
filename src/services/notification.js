const db = require("../models")
const admin = require("../firebase")

const host = process.env.HOST;

const create = (req) => new Promise(async (resolve, reject) => {
    const {body, file} = req;
    const userId = req.user.id;

    const pathFile = file?.path?.split("\\").slice(1).join("/")

    try {
        const notificationInsert = await db.Notification.create({
            image: pathFile,
            title: body.title,
            content: body.content,
            link: body.link,
            userId: userId,
        })

        const message = {
            data: {
                id: notificationInsert.dataValues.id.toString(),
            },
            notification: {
                title: notificationInsert.dataValues.title,
                body: notificationInsert.dataValues.content,
                imageUrl: notificationInsert.dataValues.image ? `${host}/${notificationInsert.dataValues.image}` : undefined
            },
            topic: process.env.TOPIC,
        };
          
        const messagingFirebase = await admin.messaging().send(message)
    
        resolve({
            erroCode: 0,
            mess: "Thông báo thành công",
            data: notificationInsert,
        })
    } catch (error) {
        console.log("err", error)
        reject(error)
    }
})

const getAll = (req) => new Promise(async (resolve, reject) => {
    console.log("req", req.query.limit)
    try {
        const notifications = await db.Notification.findAll(
            {   
                limit: req.query.limit ? Number(req.query.limit) : undefined,
                order: [ [ 'createdAt', 'DESC' ]],
            }
        );

        const convertRes = notifications.map(notification => {
            return {...notification.dataValues, image: notification.dataValues.image ? `${host}/${notification.dataValues.image}`: undefined}
        })

        resolve({
            erroCode: 0,
            mess: "Lấy dữ liệu thành công",
            data: convertRes
        })
    } catch (error) {
        reject(error)
    }
})


const getDetail = (id) => new Promise(async (resolve, reject) => {
    try {
        const notificationInfor = await db.Notification.findByPk(
            id,
            {
                attributes: ["id", "title" , "content", "link", "image", "createdAt"],
                include: [
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
            data: {...notificationInfor.dataValues, image: notificationInfor.dataValues.image ? `${host}/${notificationInfor.dataValues.image}` : undefined}
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {create, getAll, getDetail}