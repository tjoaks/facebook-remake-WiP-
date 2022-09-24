const jwt = require("jsonwebtoken");

token = "nG|whJD>V9jN)';+'k].-+NbUm?s'*rk3vY$_Y_czx|#z%(MDaM5/}#$=L5zyiw";

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, token, {
    expiresIn: expired,
  });
};
