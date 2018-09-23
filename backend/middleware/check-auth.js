const jwt = require("jsonwebtoken");

module.exports = (req , res , next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secretkey');
    req.userData = { userMail: decodedToken.userMail , userId: decodedToken.userId , userName: decodedToken.userName  };
    next();
  } catch (error) {
    res.status(401).json({ message: "pleae login first" });
  }
};
