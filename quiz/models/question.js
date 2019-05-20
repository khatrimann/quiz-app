var mongoose = require('mongoose'),
Schema = mongoose.Schema;

questionSchema = new Schema({
    question: String,
    options: [{ type: String }],
    answer: String
});

module.exports = mongoose.model('Question', questionSchema);