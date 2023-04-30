const fluctuation = require("../services/fluctuation");

const getAll = async (req, res) => {
    try {
        const response = await fluctuation.getAll()
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
        const response = await fluctuation.create(req)
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
        const response = await fluctuation.getDetail(id)
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