const AuthService = require('./service');


async function signIn(req, res, next){
  try {
    const {email, password} = req.body;
    const getAuth = await AuthService.signIn({email, password});
    res.status(201).json(getAuth)
  
  } catch (error) {
    res.json(error.message)
  }
}




module.exports = {
  signIn,
}