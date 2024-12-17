const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name...."],
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: [true, "Please enter your email..."],
            unique: true,
            maxlength: 50,
        },
        password: {
            type: String,
            required: [true, "Please enter your password....."],
            minLength: [8, "Password should be greater than 8 characters...."],
            select: false,
        },
        phoneNumber: {
            type: Number,
        },
        addresses: [
            {
                country: {
                    type: String,
                },
                city: {
                    type: String,
                },
                address1: {
                    type: String,
                },
                address2: {
                    type: String,
                },
                zipCode: {
                    type: String,
                },
                addressType: {
                    type: String,
                },
            },
        ],
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        avatar: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        resetPasswordToken: String,
        resetPasswordTime: Date,
    },
    {
        timestamps: true,
    }
);

//HashPassword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
