const total = require("../services/total");

const getTotal = async (req, res) => {
    try {
        const response = await total.getTotal()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {
    getTotal
}