var express = require('express');
var router = express.Router();
var Questions = require('../models/question');
var xmld = require('xml');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Questions.aggregate([{ $sample: { size: 15 } }, { $project: { _id: 0 }}])
  .then( questions => {
//     res.set('Content-Type', 'text/xml');
//     var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><quiz>";
//     for (var i = 0; i < questions.length; i++){
//       var obj = questions[i];
//       xml += `<${i}>`;
//       for (var key in obj){
//           var attrName = key;
//           var attrValue = obj[key];
//           xml += `<${key}>${obj[key]}</${key}>`;
//       }
//       xml += `</${i}>`;
//   }
//   xml += xml + '</quiz>';
// console.log(xml);
//     res.send(xmld(xml));
    res.send(questions);

  });
});

module.exports = router;
