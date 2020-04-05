import express from 'express';
import UserController from '../controllers/users';
import PostController from '../controllers/posts';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
	const data = await UserController.fetchUsers();
	res.json({ data, success: true });
});

router.post('/friend', async (req, res, next) => {
	try {
		await UserController.addFriend(req.body);
		res.json({
			success: true,
		});
	} catch (error) {
		console.log(123, error);
		res.json({
			success: false,
			data: error,
		});
	}
});

router.delete('/', async (req, res, next) => {
	try {
		await UserController.deleteFriend(req.body);
		res.json({
			success: true,
		});
	} catch (error) {
		res.json({
			success: false,
			data: error,
		});
	}
});

router.get('/friendsById', async (req, res, next) => {
	try {
		const data = await UserController.findFriendsByUserId(req.query);
		res.json({
			success: true,
			data,
		});
	} catch (error) {
		res.json({
			success: false,
			data: error,
		});
	}
});

router.get('/userById', async (req, res, next) => {
	try {
		const data = await UserController.findUserById(req.query);
		res.json({
			success: true,
			data,
		});
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.get('/findStrangerById', async (req, res, next) => {
	try {
		const data = await UserController.findStrangerById(req.query);
		res.json({
			success: true,
			data,
		});
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.get('/findFriendDataById', async (req, res, next) => {
	try {
		const data = await UserController.findFriendDataById(req.query);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.put('/userData', async (req, res, next) => {
	try {
		const data = await UserController.updateUserData(req.body);
		res.json({ success: true, data });
	} catch (error) {
		console.log(error);
		res.json({ success: false, data: error });
	}
});

router.post('/current', async (req, res, next) => {
	try {
		const data = await UserController.getCurrent(req.body);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

export default router;
