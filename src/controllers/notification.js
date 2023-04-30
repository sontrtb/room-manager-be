const notification = require("../services/notification");

const getAll = async (req, res) => {
   
}


const create = async (req, res) => {
    try {
        const response = await notification.create(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const getDetail = async (req, res) => {
   
}

module.exports = {
    getAll,
    create,
    getDetail
}