const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../settings');

const router = express.Router();

// @route POST api/users
// @desc register user
// @access public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8+ characters').isLength({ min: 8 })
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

        // check if user exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists with this email' } ]});
        }

        // create new user
        user = new User({
            name,
            email,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save new user
        await user.save();

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