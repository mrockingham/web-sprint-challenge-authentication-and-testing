/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){

  const token = req.header('auth-Token')
  if(!token) return res.status(401).send('Acess Denied')

  try{
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
  }catch (err){
      res.status(400).send('invalid token')
  }
}