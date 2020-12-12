require('dotenv').config();
const express = require('express');
const formData = require('express-form-data');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const db = knex(knexConfig);
const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
app.use(cors());

app.get('/', (req, res) => { res.send("Hello world") })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())
app.post('/image-upload', image.handleImageUpload())

app.get("*", (req, res) => {
    res.send("sorry, nothing here((");
});

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})