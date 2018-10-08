const handleRegister = (req, res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if (!email || !name || !password) {
		return res.status(400).json("Incorrect form submission");
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		}).into('login')
		.returning('email')
		.then(returnEmail => {
			return trx('users').returning('*')
				.insert({
					name: name,
					email: returnEmail[0],
					joined: new Date()
				}).then(user => {
					res.json(user[0]);	
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {
		res.status(400).json("Unable to register");
	});
}

module.exports = {
	handleRegister: handleRegister
};