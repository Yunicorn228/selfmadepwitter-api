import Users from '../models/User';
import paginate from '../helpers/paginate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = token => jwt.verify(token, jwtSecret);

const fetchUsers = async () => {
	const data = await Users.find();
	return data;
};

const addFriend = async data => {
	const { userId, friendId } = data;
	console.log(userId, friendId);
	const user = await Users.findById(userId);
	const friend = await Users.findById(friendId);
	const found1 = user.friends.includes(friendId);
	const found2 = friend.friends.includes(userId);
	console.log(user.friends, friend.friends);
	if (userId === friendId) throw 'you cant add your self';
	if (userId && friendId) {
		if (found1 || found2) throw 'these users are already friend';
		await Users.findByIdAndUpdate(friendId, { $push: { friends: user._id } });
		await Users.findByIdAndUpdate(userId, { $push: { friends: friend._id } });
	} else {
		throw 'missing one or more user ID';
	}
};

const deleteFriend = async data => {
	const { userId, friendId } = data;
	const user = await Users.findById(userId);
	const friend = await Users.findById(friendId);
	const found = user.friends.includes(friendId);
	if (userId === friendId) throw 'you cant delete yourself';
	if (userId && friendId) {
		if (!found) throw 'these users are not friend';
		await Users.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
		await Users.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
	} else {
		throw 'missing one or more user ID';
	}
};

const findFriendsByUserId = async data => {
	const { userId } = data;
	if (userId) {
		try {
			const user = await Users.findById(userId);
			const friends = user.friends;
			const result = await Users.find({ _id: { $in: friends } });
			return result;
		} catch (error) {
			throw error;
		}
	} else {
		throw 'userId not working';
	}
};

const findUserById = async data => {
	const { userId } = data;
	if (userId) {
		try {
			const result = await Users.findById(userId);
			return result;
		} catch (error) {}
	} else {
		throw 'Id not working';
	}
};

const findStrangerById = async data => {
	const { userId } = data;
	if (userId) {
		try {
			const user = await Users.findById(userId);
			const friends = user.friends;
			friends.push(userId);
			const result = await Users.find({
				_id: {
					$nin: friends,
				},
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
};

const findFriendDataById = async data => {
	const { userId } = data;
	if (userId) {
		try {
			const user = await Users.findById(userId);
			const friends = user.friends;
			const result = await Users.find({ _id: { $in: friends } });
			return result;
		} catch (error) {}
	} else {
		throw 'userId is not define';
	}
};

const updateUserData = async data => {
	const { firstName, lastName, gender, password, userId } = data;
	if (userId) {
		try {
			const encryptedPassword = bcrypt.hashSync(password, 10);
			const result = await Users.findByIdAndUpdate(
				userId,
				{
					$set: {
						firstName: firstName,
						lastName: lastName,
						gender: gender,
						password: encryptedPassword,
					},
				},
				{ new: true },
			);
			return result;
		} catch (error) {
			throw error;
		}
	} else {
		throw 'user is not define';
	}
};

const getCurrent = async data => {
	const { token } = data;
	try {
		const id = await jwt.verify(token, jwtSecret);
		const { userId } = id;
		console.log(userId);
		return await Users.findById(userId);
	} catch (error) {
		throw error;
	}
};

const UserController = {
	fetchUsers,
	addFriend,
	deleteFriend,
	findFriendsByUserId,
	findUserById,
	findStrangerById,
	findFriendDataById,
	updateUserData,
	getCurrent,
};

export default UserController;
