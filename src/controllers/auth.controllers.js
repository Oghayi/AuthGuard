import { User } from '../models/user.models.js';
import generateToken from '../utils/generationToken.js';
import axios from 'axios';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

const registerUser = async (req, res) => {
    try {
    const { username, email, password, role } = req.body;
    //Basic validation
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    //Checking if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    //Create user
    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
        role,
        loggedIn: false,
    });
    res.status(201).json({message: 'User registered successfully', user: {_id: user._id, username: user.username, email: user.email, role: user.role}, token: generateToken(user)});
}
catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
}
};

//Send verification via email
/*await axios.post(
  'http://localhost:5000/api/verify/send',
  {
    email: User.email,
    username: User.username,
  },
  {
    headers: {
     Authorization: `Bearer ${token}`,
    },
  }
);*/

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public

// Log in User
const loginUser = async (req, res) => {
    try {
        //Checking if user exists
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // Comparing password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}


export { registerUser, loginUser };

