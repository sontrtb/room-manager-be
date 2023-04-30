const db = require("../models")

const getAll = () => new Promise(async (resolve, reject) => {
    try {
        const fluctuations = await db.Fluctuation.findAll(
            {
                include: [
                    {
                        model: db.Category,
                        as: "categoryData",
                        attributes: ["id", "name", "price"]
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

const create = (req) => new Promise(async (resolve, reject) => {
    const {categoryId, type, amountMoney, content, price} = req.body;
    const userId = req.user.id;

    try {
        const fluctuationInsert = await db.Fluctuation.create({
            type: type,
            amountMoney: amountMoney,
            categoryId: categoryId,
            content: content,
            userId: userId,
            price: price
        })

        const total = await db.Total.findByPk(1);
        if(type == 0) {
            total.total -= Number(amountMoney)
        } else {
            total.total += Number(amountMoney)
        }
        await total.save();

        resolve({
            erroCode: 0,
            mess: "Thêm sách thành công",
            data: fluctuationInsert
        })
    } catch (error) {
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