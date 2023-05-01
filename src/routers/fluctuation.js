const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const fluctuation = require("../controllers/fluctuation");

router.use(verifyToken)

router.get('/', fluctuation.getAll)
router.get('/:id', fluctuation.getDetail)
router.post('/create', fluctuation.create)

module.exports = router;