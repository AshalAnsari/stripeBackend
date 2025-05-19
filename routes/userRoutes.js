const { Router } = require("express")
const { createUser, getUsers } = require("../controller/userController")

const router = Router()

router.get("/get-users", getUsers)
router.post("/signup", createUser)


module.exports = router