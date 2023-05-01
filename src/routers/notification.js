const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const notification = require("../controllers/notification");
const upload = require("../upload")

router.use(verifyToken)

router.post('/create', upload.single('image'), notification.create)
router.get('/', notification.getAll)
router.get('/:id', notification.getDetail)

module.exports = router;