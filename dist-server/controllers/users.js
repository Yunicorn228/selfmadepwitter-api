"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var jwtSecret = process.env.JWT_SECRET;

var verifyToken = token => _jsonwebtoken.default.verify(token, jwtSecret);

var fetchUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var data = yield _User.default.find();
    return data;
  });

  return function fetchUsers() {
    return _ref.apply(this, arguments);
  };
}();

var addFriend = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (data) {
    var {
      userId,
      friendId
    } = data;
    console.log(userId, friendId);
    var user = yield _User.default.findById(userId);
    var friend = yield _User.default.findById(friendId);
    var found1 = user.friends.includes(friendId);
    var found2 = friend.friends.includes(userId);
    console.log(user.friends, friend.friends);
    if (userId === friendId) throw 'you cant add your self';

    if (userId && friendId) {
      if (found1 || found2) throw 'these users are already friend';
      yield _User.default.findByIdAndUpdate(friendId, {
        $push: {
          friends: user._id
        }
      });
      yield _User.default.findByIdAndUpdate(userId, {
        $push: {
          friends: friend._id
        }
      });
    } else {
      throw 'missing one or more user ID';
    }
  });

  return function addFriend(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteFriend = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (data) {
    var {
      userId,
      friendId
    } = data;
    var user = yield _User.default.findById(userId);
    var friend = yield _User.default.findById(friendId);
    var found = user.friends.includes(friendId);
    if (userId === friendId) throw 'you cant delete yourself';

    if (userId && friendId) {
      if (!found) throw 'these users are not friend';
      yield _User.default.findByIdAndUpdate(userId, {
        $pull: {
          friends: friendId
        }
      });
      yield _User.default.findByIdAndUpdate(friendId, {
        $pull: {
          friends: userId
        }
      });
    } else {
      throw 'missing one or more user ID';
    }
  });

  return function deleteFriend(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var findFriendsByUserId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    if (userId) {
      try {
        var user = yield _User.default.findById(userId);
        var friends = user.friends;
        var result = yield _User.default.find({
          _id: {
            $in: friends
          }
        });
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      throw 'userId not working';
    }
  });

  return function findFriendsByUserId(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var findUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    if (userId) {
      try {
        var result = yield _User.default.findById(userId);
        return result;
      } catch (error) {}
    } else {
      throw 'Id not working';
    }
  });

  return function findUserById(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var findStrangerById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    if (userId) {
      try {
        var user = yield _User.default.findById(userId);
        var friends = user.friends;
        friends.push(userId);
        var result = yield _User.default.find({
          _id: {
            $nin: friends
          }
        });
        return result;
      } catch (error) {
        throw error;
      }
    }
  });

  return function findStrangerById(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var findFriendDataById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (data) {
    var {
      userId
    } = data;

    if (userId) {
      try {
        var user = yield _User.default.findById(userId);
        var friends = user.friends;
        var result = yield _User.default.find({
          _id: {
            $in: friends
          }
        });
        return result;
      } catch (error) {}
    } else {
      throw 'userId is not define';
    }
  });

  return function findFriendDataById(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var updateUserData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (data) {
    var {
      firstName,
      lastName,
      gender,
      password,
      userId
    } = data;

    if (userId) {
      try {
        var encryptedPassword = _bcryptjs.default.hashSync(password, 10);

        var result = yield _User.default.findByIdAndUpdate(userId, {
          $set: {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            password: encryptedPassword
          }
        }, {
          new: true
        });
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      throw 'user is not define';
    }
  });

  return function updateUserData(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

var getCurrent = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (data) {
    var {
      token
    } = data;

    try {
      var id = yield _jsonwebtoken.default.verify(token, jwtSecret);
      var {
        userId
      } = id;
      console.log(userId);
      return yield _User.default.findById(userId);
    } catch (error) {
      throw error;
    }
  });

  return function getCurrent(_x8) {
    return _ref9.apply(this, arguments);
  };
}();

var UserController = {
  fetchUsers,
  addFriend,
  deleteFriend,
  findFriendsByUserId,
  findUserById,
  findStrangerById,
  findFriendDataById,
  updateUserData,
  getCurrent
};
var _default = UserController;
exports.default = _default;