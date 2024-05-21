const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: [true, "Email is Required!"], 
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email address"
        } 
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [20, "Password must be at most 20 characters"]
    },
    image: { 
        type: String, 
        required: false 
    },
    name: { 
        type: String, 
        required: false
    },
    phone: { 
        type: String, 
        required: false,
        validate: {
            validator: function(v) {
                return /^\d{11}$/.test(v);
            },
            message: "Please enter a valid 11-digit phone number"
        } 
    },
    image_id: { 
        type: String 
    },
    role: { 
        type: String, 
        default: 'user' 
    }
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
const User = mongoose.model("User", UserSchema);
module.exports = User;
