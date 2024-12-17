//create token and saving in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    //Options for cookies
    const options = {
        maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;

