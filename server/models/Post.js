import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	text: String,
	likes: [String],
	report: [String],
	authorId: String,
	comment: [Object],
});

const Posts = mongoose.model('Posts', PostSchema);

export default Posts;
