import express from 'express';
import PostController from '../controllers/posts';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
	try {
		const data = await PostController.fetchPosts();
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.post('/', async (req, res, next) => {
	const data = await PostController.createPost(req.body);
	res.json({
		success: true,
		data,
	});
});

router.get('/postByUserId', async (req, res, next) => {
	try {
		const data = await PostController.postByUserId(req.query);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.get('/postByFriendId', async (req, res, next) => {
	try {
		const data = await PostController.postByFriendId(req.query);
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

router.get('/postByPostId', async (req, res, next) => {
	try {
		const data = await PostController.postByPostId(req.query);
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

router.post('/comment', async (req, res, next) => {
	try {
		const data = await PostController.createComment(req.body);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.post('/likePost', async (req, res, next) => {
	try {
		const data = await PostController.likePost(req.body);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.post('/unlikePost', async (req, res, next) => {
	try {
		const data = await PostController.unlikePost(req.body);
		res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

router.post('/likeComment', async (req, res, next) => {
	try {
		const data = await PostController.likeComment(req.body);
		return res.json({ success: true, data });
	} catch (error) {
		console.log(error);
		res.json({ success: false, data: error });
	}
});

router.post('/unlikeComment', async (req, res, next) => {
	try {
		const data = await PostController.unlikeComment(req.body);
		return res.json({ success: true, data });
	} catch (error) {
		res.json({ success: false, data: error });
	}
});

export default router;
