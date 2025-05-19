const {Router} = require("express");
const { createPaymentIntent, getPublishableKeys } = require("../controller/stripeController");

const router = Router()

router.post("/payment-intent", createPaymentIntent)

//Note: Guest can access the Stripe Publishable Keys
router.get("/keys", getPublishableKeys)


module.exports = router;