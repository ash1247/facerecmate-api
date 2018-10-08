const handleProfileGet = (db) => (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).send("No such user found");
			}	
		}).catch(err => {
			res.status(404).send("Error in connection");
	});
};

module.exports = {
	handleProfileGet: handleProfileGet
};