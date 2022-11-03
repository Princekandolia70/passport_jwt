const jwt = require('jsonwebtoken');
module.exports = {
	isSignedIn: (req, res, next) => {
		const token = req.headers['authorization'] ? req.headers['authorization'].trim().split(" ")[1] : null;
		if (!token) {
			return res.status(400).json({
				success: false,
				status: 401,
				message: 'User is not authorized for this operation'
			})
		}
		try {
			const decoded = jwt.verify(token, process.env.JWTSecretKey);
			req.user = decoded;
		} catch (error) {
			return res.status(401).json({
				success: false,
				status: 401,
				message: 'User is not authorized for this operation'
			})
		}
		return next();
	},
	validation : (schema) => async (req, res, next) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (err) {
			return res.status(500).json({ type: err.name, message: err.message });
		}
	}
}