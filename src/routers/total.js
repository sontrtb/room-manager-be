const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const total = require("../controllers/total");

router.use(verifyToken)

router.get('/', total.getTotal)

module.exports = router;