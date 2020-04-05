"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchPosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var result = yield _Post.default.find();
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function fetchPosts() {
    return _ref.apply(this, arguments);
  };
}();

var createPost = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (data) {
    var {
      authorId,
      text
    } = data;
    var result = yield _Post.default.create({
      authorId,
      text
    });
    return result;
  });

  return function createPost(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var postByUserId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    try {
      var result = yield _Post.default.find({
        authorId: userId
      });
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function postByUserId(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var postByFriendId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    try {
      var user = yield _User.default.findById(userId);
      var friend = user.friends;
      friend.push(userId);
      var result = yield _Post.default.find({
        authorId: {
          $in: friend
        }
      });
      console.log(friend);
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function postByFriendId(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var postByPostId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (data) {
    try {
      var {
        postId
      } = data;
      var result = yield _Post.default.findById(postId);
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function postByPostId(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var createComment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (data) {
    var {
      authorId,
      postId,
      text
    } = data;

    try {
      var result = yield _Post.default.findByIdAndUpdate(postId, {
        $push: {
          comment: {
            text,
            authorId
          }
        }
      }, {
        new: true
      });
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function createComment(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var likePost = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (data) {
    var {
      postId,
      userId
    } = data;
    var post = yield _Post.default.findById(postId);
    var likeArr = post.likes;
    if (likeArr.includes(userId)) throw 'you have already liked this post';

    try {
      var result = yield _Post.default.findByIdAndUpdate(postId, {
        $push: {
          likes: userId
        }
      }, {
        new: true
      });
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function likePost(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var unlikePost = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (data) {
    var {
      postId,
      userId
    } = data;
    var post = yield _Post.default.findById(postId);
    var likeArr = post.likes;
    if (!likeArr.includes(userId)) throw 'you have not like the post';

    try {
      var result = yield _Post.default.findByIdAndUpdate(postId, {
        $pull: {
          likes: userId
        }
      }, {
        new: true
      });
      return result;
    } catch (error) {
      throw error;
    }
  });

  return function unlikePost(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

var likeComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (data) {
    var {
      postId,
      userId,
      commentIndex
    } = data;
    var {
      comment
    } = yield _Post.default.findById(postId);
    console.log(comment);
    var currentComment = comment[commentIndex];
    var currentLikes = currentComment.likes || [];

    if (currentLikes.includes(userId)) {
      throw 'you have already liked this comment';
    } else {
      try {
        var nextComment = _objectSpread({}, currentComment, {
          likes: [...currentLikes, userId]
        });

        comment[commentIndex] = nextComment;
        var result = yield _Post.default.findByIdAndUpdate(postId, {
          $set: {
            comment
          }
        }, {
          new: true
        });
        return result;
      } catch (error) {
        throw error;
      }
    }
  });

  return function likeComment(_x8) {
    return _ref9.apply(this, arguments);
  };
}();

var unlikeComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (data) {
    var {
      userId,
      postId,
      commentIndex
    } = data;
    var {
      comment
    } = yield _Post.default.findById(postId);
    var currComment = comment[commentIndex];
    var currentLikes = currComment.likes;

    if (!currentLikes.includes(userId)) {
      throw 'you have to like the comment first ';
    } else {
      try {
        var nextLike = currentLikes.filter(like => like !== userId);

        var nextComment = _objectSpread({}, currComment, {
          likes: [...nextLike]
        });

        comment[commentIndex] = nextComment;
        var result = yield _Post.default.findByIdAndUpdate(postId, {
          $set: {
            comment
          }
        }, {
          new: true
        });
        return result;
      } catch (error) {
        throw error;
      }
    }
  });

  return function unlikeComment(_x9) {
    return _ref10.apply(this, arguments);
  };
}();

var PostController = {
  fetchPosts,
  createPost,
  postByUserId,
  postByFriendId,
  postByPostId,
  createComment,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment
};
var _default = PostController;
exports.default = _default;