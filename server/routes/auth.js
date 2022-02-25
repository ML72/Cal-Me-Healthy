const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { JWT_SECRET } = require('../settings');

const router = express.Router();

// @route GET api/auth
// @desc get user by token
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route POST api/auth
// @desc authenticate user and get token
// @access public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        const invalidCredentials = () => {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ]});
        }

        // check if user exists
        let user = await User.findOne({ email });
        if(!user) {
            invalidCredentials();
        }

        // make sure username and password are valid
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            invalidCredentials();
        }

        // return jsonwebtoken (to authenticate)
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, JWT_SECRET, {
            expiresIn: 259200 // 3 days
        }, (err, token) => {
            if(err) { throw err; }
            res.json({ token });
        })
    
    } catch(err) { 

        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;