const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const notification = require("../controllers/notification");

// router.get('/', fluctuation.getAll)
// router.get('/:id', fluctuation.getDetail)

router.use(verifyToken)

router.post('/create', notification.create)

module.exports = router;