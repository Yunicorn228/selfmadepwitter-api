import mongoose from 'mongoose';
require('dotenv').config();

const connectionString =
	'mongodb+srv://admin:freebeach@cluster0-b4koz.mongodb.net/switter';

let isConnected;

const connectToDatabase = () => {
	if (isConnected) {
		console.log('=> using existing database connection');
		return Promise.resolve();
	}
	console.log('=> using new database connection');
	return mongoose
		.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(db => {
			isConnected = db.connections[0].readyState;
			console.log('Connection Success!');
		})
		.catch(e => {
			console.log(e);
		});
};

export default connectToDatabase;
