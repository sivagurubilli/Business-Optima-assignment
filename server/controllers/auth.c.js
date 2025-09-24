const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/usermodel'); // Sequelize User model
const { generateAccessToken } = require('../middlewares/authentication.mlw');

const getCurrentDateAndTime = () => {
  return new Date(); // Return current time
};

// Register User
exports.register = async (req, res, next) => {
  try {
    const { fullName, emailAddress, password, phoneNumber } = req.body;

    // Check if email is already taken
    const checkEmailAddress = await User.findOne({ where: { emailAddress, isDeleted: false } });
    if (checkEmailAddress) {
      throw { status: 409, message: 'Email is already taken. Try with another.' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Proceed with user registration
    const userData = await User.create({
      fullName,
      emailAddress,
      password: hashedPassword, // Store hashed password
      phoneNumber,
      createdAt: getCurrentDateAndTime(),
      updatedAt: getCurrentDateAndTime(),
    });

    res.status(201).send({ status: 1, success: true, message: 'User registered successfully', data: userData });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ where: { emailAddress, isDeleted: false } });
    if (!user) {
      throw { status: 404, message: 'No account found!' };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: 'Invalid password!' };
    }

    const { token, expiryTime } = generateAccessToken(user);
    
    res.status(200).send({
      status: 1,
      success: true,
      message: 'Login successful',
      data: {
        userId: user.id,
        emailAddress: user.emailAddress,
        accessToken: token,
        expiryTime: expiryTime,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).send({ status: 1, success: true, message: 'Profile fetched successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// Edit Profile
exports.editProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { fullName, emailAddress, phoneNumber, password } = req.body;

  try {
    const updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (emailAddress) updateFields.emailAddress = emailAddress;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    await User.update(updateFields, { where: { id: userId } });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).send('Error updating profile');
  }
};
