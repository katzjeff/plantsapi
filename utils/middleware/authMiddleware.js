import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user information to the request object
    req.userData = {
      userId: decodedToken.userId,
      userName: decodedToken.userName,
    };

    next(); // Allow access to the route
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticateUser;
