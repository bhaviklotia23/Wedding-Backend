const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  console.log("user", user)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { // Token in which user details like Id is stored.
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  const serialized = cookie.serialize("token", token, {
    httpOnly: false,
    // secure: process.env.MODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 1, // 1 day
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  res.setHeader(
    "Set-Cookie",
    serialized,
    "visited=true; Max-Age=3000; HttpOnly, Secure"
  );

  res.cookie("cookieName", "Rrr", { maxAge: 900000, httpOnly: true });

  res.cookie("access", token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "none",
    secure: true,
    // httpOnly: true,
  });

  const userData = {
    _id : user._id,
    email : user.email ,
    createdAt: user.createdAt,
  }

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 70000000),
    })
    .json({
      status: statusCode,
      success: true,
      userData,
      token,
    });
};

module.exports = sendToken;