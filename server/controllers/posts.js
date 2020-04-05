import Posts from '../models/Post';
import paginate from '../helpers/paginate';
import Users from '../models/User';

const fetchPosts = async () => {
	try {
		const result = await Posts.find();
		return result;
	} catch (error) {
		throw error;
	}
};

const createPost = async data => {
	const { authorId, text } = data;
	const result = await Posts.create({ authorId, text });
	return result;
};

const postByUserId = async data => {
	const { userId } = data;
	try {
		const result = await Posts.find({ authorId: userId });
		console.log(result);
		return result;
	} catch (error) {
		throw error;
	}
};

const postByFriendId = async data => {
	const { userId } = data;
	try {
		const user = await Users.findById(userId);
		const friend = user.friends;
		friend.push(userId);
		const result = await Posts.find({ authorId: { $in: friend } });
		console.log(friend);
		return result;
	} catch (error) {
		throw error;
	}
};

const postByPostId = async data => {
	try {
		const { postId } = data;
		const result = await Posts.findById(postId);
		return result;
	} catch (error) {
		throw error;
	}
};

const createComment = async data => {
	const { authorId, postId, text } = data;
	try {
		const result = await Posts.findByIdAndUpdate(
			postId,
			{
				$push: {
					comment: {
						text,
						authorId,
					},
				},
			},
			{ new: true },
		);

		return result;
	} catch (error) {
		throw error;
	}
};

const likePost = async data => {
	const { postId, userId } = data;
	const post = await Posts.findById(postId);
	const likeArr = post.likes;
	if (likeArr.includes(userId)) throw 'you have already liked this post';
	try {
		const result = await Posts.findByIdAndUpdate(
			postId,
			{
				$push: { likes: userId },
			},
			{ new: true },
		);
		console.log(result);
		return result;
	} catch (error) {
		throw error;
	}
};

const unlikePost = async data => {
	const { postId, userId } = data;
	const post = await Posts.findById(postId);
	const likeArr = post.likes;
	if (!likeArr.includes(userId)) throw 'you have not like the post';
	try {
		const result = await Posts.findByIdAndUpdate(
			postId,
			{
				$pull: { likes: userId },
			},
			{ new: true },
		);
		return result;
	} catch (error) {
		throw error;
	}
};

const likeComment = async data => {
	const { postId, userId, commentIndex } = data;
	const { comment } = await Posts.findById(postId);
	console.log(comment);
	const currentComment = comment[commentIndex];
	const currentLikes = currentComment.likes || [];
	if (currentLikes.includes(userId)) {
		throw 'you have already liked this comment';
	} else {
		try {
			const nextComment = {
				...currentComment,
				likes: [...currentLikes, userId],
			};
			comment[commentIndex] = nextComment;
			const result = await Posts.findByIdAndUpdate(
				postId,
				{
					$set: { comment },
				},
				{ new: true },
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
};

const unlikeComment = async data => {
	const { userId, postId, commentIndex } = data;
	const { comment } = await Posts.findById(postId);
	const currComment = comment[commentIndex];
	const currentLikes = currComment.likes;
	if (!currentLikes.includes(userId)) {
		throw 'you have to like the comment first ';
	} else {
		try {
			const nextLike = currentLikes.filter(like => like !== userId);
			const nextComment = { ...currComment, likes: [...nextLike] };
			comment[commentIndex] = nextComment;
			const result = await Posts.findByIdAndUpdate(
				postId,
				{
					$set: { comment },
				},
				{ new: true },
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
};

const PostController = {
	fetchPosts,
	createPost,
	postByUserId,
	postByFriendId,
	postByPostId,
	createComment,
	likePost,
	unlikePost,
	likeComment,
	unlikeComment,
};

export default PostController;
