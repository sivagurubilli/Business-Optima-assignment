let   User = require("../models/user.m");
let {generateAccessToken} = require("../middlewares/authentication.mlw")


getCurrentDateAndTime = () => {
    const now = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const indianTime = new Date(now.getTime() + ISTOffset);
    return indianTime;
}


  exports.register = async (req, res, next) => {
    try {
      let {
        fullName,
        emailAddress,
        password,
        phoneNumber,
       
      } = req.body;
  
      let checkemailAddress = await User.findOne({ emailAddress, isDeleted: false });
      if (checkemailAddress) throw { status: 409, message: "Email is already taken. Try with another" }
    
      // Proceed with user registration if all validations pass
      let currentDateTime = getCurrentDateAndTime();
      let userData = await User.create({
        fullName,
        emailAddress,
        password,
        phoneNumber,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
        
      });
  
      res.status(201).send({ status: 1, success: true, message: "User registered successfully", data: userData });
    } catch (error) {
      next(error);
    }
  };
  


  exports.login = async (req, res, next) => {
    try {
      let {
        emailAddress,
        password,
      } = Object.assign(req.body, req.query, req.params);
  
      let dbQuery = { isDeleted: false,  emailAddress,password};
      let user = await User.findOne(dbQuery).lean();
      user = JSON.parse(JSON.stringify(user));
      if (!user) throw { status: 404, message: "No account found!" };
      else {
        let  { token, expiryTime } =generateAccessToken(user)
        res.status(200).send({
          status: 1, success: true, message: "Login successfull",
          data: {
            userId: user._id,
            emailAddress: user.emailAddress,
            accessToken : token,
            expiryTime:expiryTime
          }
        })
      }
    } catch (error) {
      next(error)
    }
  };


  exports.getProfile = async (req, res, next) => {
    try {
      let user = req.user;
      res.status(200).send({ status: 1, success: true, message: "Profile fetched successfully", data: user })
  
    }
    catch (error) {
      next(error)
    }
  }
  
exports.editprofile = async (req, res) => {
    const userId = req.user.userId;
    const {  fullName,
      emailAddress,
      phoneNumber,
      password
       } = req.body;
  
    try {
      let updateFields = {};
      if (name) updateFields.name = name;
      if (password) updateFields.password = await bcrypt.hash(password, 10);
  
      await db.query('UPDATE users SET ? WHERE id = ?', [updateFields, userId]);
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).send('Error updating profile');
    }
  };
  