const auth = require("../services/auth")

const register = async (req, res) => {
    try {
        const {userName, password, name} = req.body;
        if(!userName || ! password || !name || userName?.length ===0 || password?.length ===0 || name?.length ===0) return res.status(400).json({
            errCode: 1,
            mess: "Tên, Tài khoản hoặc mật khẩu không được để trống"
        })
    
        const response = await auth.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        if(!userName || ! password) return res.status(400).json({
            errCode: 1,
            mess: "Tài khoản hoặc mật khẩu không hợp lệ"
        })

        console.log("req", req.body)
    
        const response = await auth.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {register, login}