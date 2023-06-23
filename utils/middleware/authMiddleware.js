import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "You are note authorized. Token missing." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};

export default authenticateUser;
