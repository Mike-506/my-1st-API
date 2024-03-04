const express = require('express');
const app = express();
const morgan = require('morgan');
const moviesRouter = require('./routes/movies');

app.set('port', process.env.PORT || 3003);
app.set('json spaces', 2);


//middlewares
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 


//routes
app.use(require('./routes/index'));
app.use('/api/movies', moviesRouter); //lo declaramos aqui la ruta
app.use('/api/users', require('./routes/users'));


//starting the server
app.listen(app.get('port'), () => {
  console.log(`The server is listening on port ${app.get('port')}`);
})