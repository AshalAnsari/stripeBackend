const { Router } = require("express")
const { createUser, getUsers, loginUser } = require("../controller/userController")
const auth = require("../middleware/auth")

const router = Router()

router.get("/get-users", auth, getUsers)
router.post("/signup", createUser)
router.post("/login", loginUser)


module.exports = router