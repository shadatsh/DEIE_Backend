const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    laboratory_category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Electronics lab',
                'Electrical lab',
                'communication lab',
                'Undergraduate lab'
            ],
            message : "Please select correct category"
        }
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [50, 'Product stock cannot exceed 20']
    },
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,    
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema