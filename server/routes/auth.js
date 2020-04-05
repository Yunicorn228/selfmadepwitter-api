import express from 'express';
import AuthController from '../controllers/auth';
const router = express.Router();

router.get('/', async (req, res) => {
	res.sendStatus(200);
});

router.post('/register', async (req, res, next) => {
	try {
		const data = await AuthController.register(req);
		res.json({ data, success: true });
	} catch (error) {
		res.json({
			error,
			success: false,
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const data = await AuthController.handleLogin(req.body);
		res.json({
			success: true,
			data,
		});
	} catch (error) {
		res.json({
			error,
			success: false,
		});
	}
});

export default router;
