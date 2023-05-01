const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const category = require("../controllers/category");

router.use(verifyToken)

router.get('/', category.getAll)
router.post('/create', category.create)

module.exports = router;