const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-shaped-78131',
      user : 'wilhelmmeyer',
      password : 'Celica18ts',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());


//send get request to the server
app.get('/', (req, res) => {
    res.send('success');
})

//signin
app.post('/signin', (req, res) => { signin.handleSignin( req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister( req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
res = this is working
signin --> POST = success or fail/ why post? sending a password to make it secure
register --> POST = new user
profile/:userId --> GET = user
image --> PUT --> user

*/