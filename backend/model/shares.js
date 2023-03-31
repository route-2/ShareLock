const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShareSchema = new Schema({
    address: {
        type: String,
    },
    share: {
        type: String,
        required: [true, 'field is required']
    },
});


const Share = mongoose.model('share',ShareSchema);

module.exports = Share;