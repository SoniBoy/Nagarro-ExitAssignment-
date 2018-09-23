const express = require('express');
const path = require('path');
const port = 3306;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// bypassing localhost CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE ,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type , Access-Control-Allow-Headers , Origin ,  Accept ,  X-Requested-With , Authorization');
  next();
});

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api/users.route' , require('./routes/api/users.route'));
app.use('/api/books.route' , require('./routes/api/books.route'));
app.use((req , res , next) => {
res.sendFile(path.join(__dirname , 'dist' , 'index.html' ));
})

app.listen( port , function(err) {

  if(err) {
    console.error('server error' , err);
  }

  else {
    console.log('server started');
  }

});
