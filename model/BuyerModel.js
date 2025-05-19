const mongoose = require("mongoose")

const BuyerSchema = new mongoose.Schema({
    Name:{
        type: String, 
        required: true,
    },
    Email:{
        type: String, 
        required: true,
    },
    CustomerId:{
        type: String, 
        required: true,
    },
    Purchase: [
        {
            projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
            amount: { type: Number },
            currency: { type: String },
            timestamp: { type: Date, default: Date.now },
            paymentIntentId: { type: String },
            status: { type: String } // This will be used to set succeeded or failed
        }
    ]

});

const BuyerModel = mongoose.model("Buyers", BuyerSchema);

module.exports = BuyerModel;