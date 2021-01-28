const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'ube',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Mike',
            email: 'mike@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}
//send get request to the server
app.get('/', (req, res) => {
    res.send(database.users);
})

//signin
app.post('/signin', (req, res) => {
    if( req.body.email === database.users[0].email &&  req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in')
    }

})

app.post('/register', (req, res) => {

 const { email, name, password} = req.body;

  db('users')
  .returning('*')
    .insert({ 
        email: email,
        name: name,
        joined: new Date()
    })
    .then( user => {
        res.json(user[0]); 
    })
    .catch( err => res.status(400).json('User already exist'))
    
});



app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    }).then( user => {
        if( user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not found!')
        }
        
    })
    .catch( err => res.status(400).json('error getting user'))

})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then ( entries => {
            res.json(entries[0]);
        })
        .catch( err => res.status(400).json('Unable to get entries'))

})

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