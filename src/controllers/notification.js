const notification = require("../services/notification");

const getAll = async (req, res) => {
    try {
        const response = await notification.getAll(req)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}


const create = async (req, res) => {
    try {
        const {title} = req.body;
        if(!title || title.length ===0) return res.status(400).json({
            errCode: 1,
            mess: "Tiêu đề không được để trống"
        })

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
    try {
        const id = req.params.id;
        const response = await notification.getDetail(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {
    getAll,
    create,
    getDetail
}