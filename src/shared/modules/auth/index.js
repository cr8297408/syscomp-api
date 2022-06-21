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

async function changePassword(req, res){
  try {
    const {email, oldPassword, newPassword} = req.body;
    const getPassAuth = await AuthService.changePassword({
      email, 
      oldPassword, 
      newPassword
    }, req.headers['authorization'])

    res.json(getPassAuth)
  } catch (error) {
    res.json(error.message)
  }
}

async function forgotPassword(req, res) {
  try {
    const {email} = req.body;
    const forgotPass = await AuthService.forgotPassword(email);
    res.json(forgotPass)
  } catch (error) {
    res.json(error.message)
  }
}

async function newPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const newPass = await AuthService.newPassword(newPassword, req.headers['authorization'])
    res.json(newPass)
  } catch (error) {
    res.json(error.message)
  }
}

async function getUserAuth(req, res){
  try {
    const userLog = await AuthService.getUserLog(req.headers['authorization']) 

    res.json(userLog)
  } catch(error) {
    throw new Error(error.message)
  }
}

module.exports = {
  signIn,
  changePassword,
  forgotPassword,
  newPassword,
  getUserAuth
}