const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'wilhelmmeyer',
      password : 'Celica18ts',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

//send get request to the server
app.get('/', (req, res) => {
    res.send('Success!');
})

//signin
app.post('/signin', (req, res) => { signin.handleSignin( req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister( req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { profile.handleProfileGet(req, res, db)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/*
res = this is working
signin --> POST = success or fail/ why post? sending a password to make it secure
register --> POST = new user
profile/:userId --> GET = user
image --> PUT --> user

*/