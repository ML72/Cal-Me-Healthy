const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SnapshotSchema = new Schema({
    data: {
        foodName: String,
        foodGroup: String,
        servingSize: Number,
        nutritionalInfo: Object,
        dailyIntakeReference: Object,
        totalNutrients: Object
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Snapshot = mongoose.model('snapshot', SnapshotSchema);