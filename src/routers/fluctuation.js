const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const fluctuation = require("../controllers/fluctuation");

router.get('/', fluctuation.getAll)
router.get('/:id', fluctuation.getDetail)

router.use(verifyToken)

router.post('/create', fluctuation.create)

module.exports = router;