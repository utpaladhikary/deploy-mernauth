const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User');

const signUp = async (req, resp) => {
  try {
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user)
    {
      return resp.status(403).json({
        message: "User already exists !!!", 
        success: false
      });
    }
    const userModel = new UserModel({name, email, password});
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    resp.status(201).json({
      message: "User detail successfully saved !!!", 
      success:true
    })
  } catch (error) {
    resp.status(500).json({
      message: 'Internal interver error', 
      success: false
    });
  }
}

const login = async (req, resp) => {
  try {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    const errorMsg = 'Wrong credential entered !!!';
    if(!user)
    {
      return resp.status(403).json({
        message: errorMsg, 
        success: false
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if(!isPassEqual)
    {
      return resp.status(403).json({
        message: errorMsg, 
        success: false
      });
    }

    const jwtToken = jwt.sign(
      {email: user.email, _id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
    )

    resp.status(200).json({
      message: "Login Success !!!", 
      success:true,
      jwtToken,
      email,
      name: user.name
    })
  } 
  catch (error) {
    resp.status(500).json({
      message: 'Internal interver error', 
      success: false
    });
  }
}

module.exports = {
  signUp,
  login
}