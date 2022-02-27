const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Snapshot = require('../models/Snapshot');
const auth = require('../middleware/auth');
const { JWT_SECRET } = require('../settings');

const router = express.Router();

// @route POST api/food/snap
// @desc report a snapshot
// @access private
router.post('/snap', auth, [
    check('details', 'No details provided').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { details } = req.body;
        const { foodName, foodGroup, servingSize, nutritionalInfo, dailyIntakeReference, totalNutrients } = details;

        if(!foodName) {
            return res.status(400).json({ errors: [ { msg: 'Please provide a name for your food!' } ]});
        }

        // create new snapshot
        snapshot = new Snapshot({
            data: {
                foodName,
                foodGroup,
                servingSize,
                nutritionalInfo,
                dailyIntakeReference,
                totalNutrients
            }
        });

        // save new snapshot
        await snapshot.save();

        // add snapshot to user
        let user = await User.findById(req.user.id);
        user.snapshots.push(snapshot._id);
        await user.save();

        res.status(200).json({
            message: 'Snapshot saved successfully'
        });
    
    } catch(err) { 

        console.error(err.message);
        res.status(500).json({ errors: [ { msg: 'Server Error - Please check parameters and try again' } ]});
    }

});

// @route GET api/food/entry
// @desc get information about a specific snapshot
// @access private
router.get('/entry', auth, async (req, res) => {

    try {

        let { index } = req.query;

        console.log("index is " + index);

        if(!index) {
            index = 1;
        }

        // get and test index
        let user = await User.findById(req.user.id);
        
        if(index < 1 || index > user.snapshots.length) {
            return res.status(400).json({ errors: [ { msg: 'Invalid entry index for ' + user.email } ]});
        }

        // get snapshot
        let snapshot = await Snapshot.findById(user.snapshots[index - 1]);

        res.json({
            snapshot
        });
    
    } catch(err) { 

        console.error(err.message);
        res.status(500).json({ errors: [ { msg: 'Server Error - Please check parameters and try again' } ]});
    }

});

module.exports = router;