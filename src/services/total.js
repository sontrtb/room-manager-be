const db = require("../models")

const getTotal = () => new Promise(async (resolve, reject) => {
    try {
        const total = await db.Total.findByPk(1);
        resolve({
            erroCode: 0,
            mess: "Lấy dữ liêu thành công",
            data: total
        })
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

module.exports = {getTotal}