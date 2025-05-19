// try{}catch(err){
//     return res.status(500).json({success: false, Message: "An error occured i.e " + err})
// }

const Stripe = require("stripe")
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const getPublishableKeys = async(req, res) => {
    try{
        const publishableKeys = process.env.STRIPE_PUBLISHABLE_KEY
        if(publishableKeys){
            return res.status(200).json({success: true, Message: "Stripe Key Found", Key:publishableKeys})
        }
        return res.status(400).json({success: false, Message:"Couldn't Find Stripe Key"})
    }catch(err){
        return res.status(500).json({success: false, Message: "An error occured i.e " + err})
    }
}


const createPaymentIntent = async(req, res) => {
    try{
        const {
            email, 
            amount, 
            currency
        } = req.body

        if(!email || (!amount || amount < 0) || !currency){
            return res.status(400).json({success: false, Message:"Missing Email or Amount or Currency"})
        }

        const customer = await createCustomerIfNotExist(email);

        if(customer.id){

            const paymentIntent = await stripe.paymentIntents.create({
                customer:customer.id,
                amount: amount, 
                currency: currency,
                description: 'Test payment',
                // payment_method: 'pm_card_visa', //// will be removed when being used with client side
                // confirm: true, //// will be removed when being used with client side
                automatic_payment_methods: {
                    enabled: true,
                    // allow_redirects: 'never', //// will be removed when being used with client side
                  },
              });
          
            return res.status(200).json({
              success: true,
              clientSecret: paymentIntent.client_secret,
              paymentIntentId: paymentIntent.id,
              customerId:customer.id
            });
        }
        return res.
                status(400).
                json(
                    {success: false, 
                        Message: "Something went wrong. Couldn't find or create the customer"
                    })
    }catch(err){
        return res.status(500).json({success: false, Message: "An error occured i.e " + err})
    }
}

const createCustomerIfNotExist = async(email) =>{
    try{
        const existingCustomer = await stripe.customers.list({
            email:email, 
            limit:1,
        })

        if(existingCustomer.data.length > 0){
            return existingCustomer.data[0];
        }
        
        const customer = await stripe.customers.create({
            email:email,
        })
        return customer;
    }catch(err){
        return null;
    }
}

module.exports = {
    createPaymentIntent,
    getPublishableKeys,

}

