import Users from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = token => jwt.verify(token, jwtSecret);

const handleLogin = async data => {
	const { phone, password } = data;
	if (phone && password) {
		try {
			const user = await Users.findOne({ phone });
			if (user) {
				const passwordMatch = bcrypt.compareSync(password, user.password);
				if (passwordMatch) {
					const token = jwt.sign({ userId: user._id }, jwtSecret);
					return {
						token,
						userId: user._id,
					};
				}
				throw 'password does not match';
			}
			throw 'user does not found';
		} catch (error) {
			throw error;
		}
	} else {
		throw 'no phone or password';
	}
};

const register = async req => {
	const { firstName, lastName, email, phone, gender, password } = req.body;
	const existEmail = await Users.findOne({ email });
	const existPhone = await Users.findOne({ phone });
	if (existEmail && existPhone) throw 'email or phone has been taken';
	if (firstName && lastName && email && phone && gender && password) {
		try {
			const newUser = {
				firstName,
				lastName,
				email,
				phone,
				gender,
			};
			const encryptedPassword = bcrypt.hashSync(password, 10);
			newUser.password = encryptedPassword;
			return Users.create(newUser);
		} catch (error) {
			throw error;
		}
	} else {
		throw 'missing information mofo';
	}
};

const AuthController = {
	handleLogin,
	register,
	verifyToken,
};

export default AuthController;
