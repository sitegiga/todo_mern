const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Sign up
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        
        await user.save().then(() => res.status(200).json({ message: "Sign Up successful" }))
        
    } catch (error) {
         res.status(200).json({ message: 'User Already Exists' });
    }
});

// Sign in
router.post('/SignIn', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Please Sign Up First' });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(200).json({ message: 'Password is not correct' });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });

    } catch (error) {
        return res.status(200).json({ message: 'User Already Exists' });
    }
});

module.exports = router;