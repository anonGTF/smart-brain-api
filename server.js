const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];

const db = knex(knexConfig);
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send("Hello world") })
app.get('/users', (req, res) => {
    db.select('*').from('users').then(user => res.json(user))
})
app.get('/login', (req, res) => {
    db.select('*').from('login').then(user => res.json(user))
})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})