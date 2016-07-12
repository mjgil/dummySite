var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

var port = process.env.PORT || 3001

/* istanbul ignore next */
if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ' + port);
}