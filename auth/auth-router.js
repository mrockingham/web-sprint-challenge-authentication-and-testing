const router = require('express').Router();
const User = require('../db/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const {registerValidation, loginValidation} = require('../auth/validation')





router.post('/register', async (req, res) => {

  const { error } = registerValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)

// Hash passwords

const salt = await bcrypt.genSalt   (10)
const hashPassword = await bcrypt.hash(req.body.password, salt)

  // implement registration

  const user = new User({
    name: req.body.name,
    password: hashPassword
  })
  try{
      const savedUser = await user.save()
      res.send({user: user._id })
  }catch(err){
    res.status(400).send(err)
  }
});



router.post('/login', async (req, res) => {
// implement login

  const { error } = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({name: req.body.name})
if(!user) return res.status(400).send('name  does not exists')

  const validPass = await bcrypt.compare(req.body.password, user.password)
if(!validPass) return res.status(400).send ('Invalid password')



const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header('auth-token', token).send(token)
  
});

module.exports = router;
