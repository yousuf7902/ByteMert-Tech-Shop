const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const User = require("../model/user");
const Order = require("../model/order.js");
const Coupon = require("../model/coupon");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middleware/AsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, admin } = require("../middleware/Auth");

//Auth user & get token
router.post(
    "/login",
    AsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select("+password");
    
            if (!email || !password) {
                return next(new ErrorHandler("Please enter your email / password", 400));
            }

            if (!user) {
                return next(new ErrorHandler("User doesn't exists....", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(new ErrorHandler("Authentication failed...", 400));
            }

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//Register User
router.post(
    "/sign-up",
    upload.single("file"),
    AsyncErrors(async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const userEmail = await User.findOne({ email });

            if (userEmail) {
                const filename = req.file.filename;
                const filePath = `uploads/${filename}`;

                fs.unlink(filePath, (err) => {
                    res.status(500).json({ message: "File deleted...." });
                });
                return next(new ErrorHandler("User already exists...", 400));
            }

            const filename = req.file.filename;
            const fileUrl = path.join(filename);

            const user = {
                name: name,
                email: email,
                password: password,
                avatar: {
                    public_id: Math.round(Math.random() * 1e9),
                    url: fileUrl,
                },
            };

            const activationToken = createActivationToken(user);
            const activationUrl = `http://localhost:3000/activation/${activationToken}`;

            try {
                await sendMail({
                    email: user.email,
                    subject: "Activate your account",
                    message: `Hello ${user.name}, please click on the link to verify ${activationUrl}`,
                });

                res.status(201).json({
                    success: true,
                    message: `Please check your email:- ${user.email} to activate your account`,
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 500));
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    })
);


// activate user
router.post(
    "/activation",
    AsyncErrors(async (req, res, next) => {
        try {
            const { activation_token } = req.body;
            const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

            if (!newUser) {
                return next(new ErrorHandler("Invalid token", 400));
            }

            const { name, email, password, avatar } = newUser;

            let user = await User.findOne({ email });

            if (user) {
                return next(new ErrorHandler("User already exists", 400));
            }

            user = await User.create({
                name,
                email,
                password,
                avatar,
            });
            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    })
);

//Log out user & distroy the cookies
router.post(
    "/logout",
    AsyncErrors(async (req, res, next) => {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            message: "Logged out successfully...",
        });
    })
);

//user profile
router.get(
    "/profile",
    isAuthenticated,
    AsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id);

            if (!user) {
                return next(new ErrorHandler("user not found", 404));
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//update user profile
router.put(
    "/profile",
    isAuthenticated,
    AsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(new ErrorHandler("user not found", 404));
            }

            user.name = req.body.name || user.name;
            user.addresses =
                [
                    {
                        address1: req.body.address,
                        city: req.body.city,
                        zipCode: req.body.postalCode,
                    },
                ] || user.addresses;
            user.phoneNumber = req.body.number || user.phoneNumber;

            const updatedUser = await user.save();
            res.status(201).json(updatedUser);
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//update user password
router.put(
    "/profile/change-password",
    isAuthenticated,
    AsyncErrors(async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email }).select("password");
            if (!user) {
                return next(new ErrorHandler("user not found", 404));
            }
            if (await user.comparePassword(req.body.currentPassword)) {
                user.password = req.body.newPassword;
            }

            const updatedUser = await user.save();
            res.status(201).json(updatedUser);
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//forgot password
router.post("/forgot-password",AsyncErrors(async (req, res, next) => {
    try{
         const user = await User.findOne({ email: req.body.email}).select("password");
         
         if(!user){
            return next(new ErrorHandler("User email is invalid", 404));
         }

         user.password = req.body.password;

         const activationToken = createActivationToken(user);
         const activationUrl = `http://localhost:8080/api/v2/users/reset-password/${activationToken}`;

         try {
             await sendMail({
                 email: req.body.email,
                 subject: "Reset your password",
                 message: `Hello, please click on the link to reset your password ${activationUrl}`,
             });

             res.status(201).json({
                 success: true,
                 message: `Please check your email:- ${req.body.email} to reset your password`,
             });

         } catch (error) {
             return next(new ErrorHandler(error.message, 500));
         }
    }
    catch(error){
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}))


//Get all users
router.get(
    "/all-users",
    isAuthenticated,
    admin,
    AsyncErrors(async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    })
);

// Get all coupons
router.get(
    "/coupons", 
    AsyncErrors(async (req, res, next) => {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.status(201).json(coupons);
    })
);

//create coupon
router.post(
    "/coupons/new",
    isAuthenticated,
    admin,
    AsyncErrors(async (req, res, next) => {
        const { code, discount, expiryDate } = req.body;
        if (!code || !expiryDate || !discount) {
            return next(new ErrorHandler("Please enter both coupon and amount", 400));
        }
        await Coupon.create({ coupon: code, discount, expiryDate });
        res.status(201).json({
            success: true,
            message: `Coupon ${code} created successfully`,
        });
    })
);

router.post(
    "/coupons/apply",
    isAuthenticated,
    AsyncErrors(async (req, res, next) => {
        const { coupon, totalPrice } = req.body;
        let discountPrice = Number(totalPrice);

        const couponDetails = await Coupon.findOne({ coupon: coupon });

        if (!couponDetails) {
            next(new ErrorHandler("This coupon is invaild. Please use valid coupon"), 204);
        }

        const currentDate = new Date();
        
        if (currentDate > couponDetails.expiryDate) {
            return next(new ErrorHandler("This coupon has expired", 400));
        }

        discountPrice = discountPrice - discountPrice * (couponDetails.discount / 100);

        res.status(201).json({
            success: true,
            discountPrice,
        });
    })
);

//delete a coupon
router.delete(
    "/coupons/:id",
    isAuthenticated,
    admin,
    AsyncErrors(async (req, res, next) => {
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!deletedCoupon) {
            return next(new ErrorHandler("Coupon not found", 404));
        }
        res.status(201).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    })
);

//Get user by id
router.get(
    "/:id",
    isAuthenticated,
    admin,
    AsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return next(new ErrorHandler("User is not found", 404));
        }

        res.status(200).json(user);
    })
);

//Delete users
router.delete(
    "/:id",
    isAuthenticated,
    admin,
    AsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User is not found", 404));
        }
        if (user.isAdmin) {
            return next(new ErrorHandler("Admin cannot be delete", 400));
        }

        await Order.deleteMany({ user: user._id });
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: "User deleted successfully" });
    })
);

router.get(
    "/reset-password/:link",
    AsyncErrors(async (req, res, next) => {
        try {
            const tokenVerify = jwt.verify(req.params.link, process.env.ACTIVATION_SECRET);
            console.log(tokenVerify)
            const user = await User.findOne({_id:tokenVerify._id}).select("password");

            if (!user) {
                return next(new ErrorHandler("Invalid token", 400));
            }
            
            user.password = tokenVerify.password;
            await user.save();
            res.redirect(`http://localhost:3000/login`); 
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//Create activation token
const createActivationToken = (user) => {
    const userObject = user.toObject ? user.toObject() : user;
    return jwt.sign(userObject, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

module.exports = router;
