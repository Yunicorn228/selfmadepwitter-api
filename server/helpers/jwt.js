require('dotenv').config();
import jwt from 'jsonwebtoken';
import Users from '../models/User';

const secret = process.env.JWT_SECRET;

const guard = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	try {
		if (!token) {
			res.json({
				data: 'no token found',
			});
		} else {
			const decrypted = await jwt.verify(token, secret);
			req.body.userId = decrypted.userId;
			return next();
		}
	} catch (error) {
		res.json({
			success: false,
			data: error,
		});
	}
};

export default guard;
