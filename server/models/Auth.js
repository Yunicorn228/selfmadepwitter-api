import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: Number,
	gender: String,
	password: String,
});

const Auth = mongoose.model('Auth', AuthSchema);

export default Auth;
