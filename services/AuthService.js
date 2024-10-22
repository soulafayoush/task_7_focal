const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  const bearerToken = token.split(' ')[1];
  try {
 
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.userId = verified.userId;  
    next();  
  } catch (error) {
   
    res.status(400).json({ error: 'Invalid token' });
  }
};
