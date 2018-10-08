const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send("it is working") });	
app.get("/profile/:id", profile.handleProfileGet(db, bcrypt));
app.post("/signIn", (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT || 3000, () => {
	console.log(`app is running on port ${PORT}`);
});

