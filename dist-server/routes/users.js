"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _posts = _interopRequireDefault(require("../controllers/posts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();
/* GET users listing. */


router.get('/fetch', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var data = yield _users.default.fetchUsers();
    res.json({
      data,
      success: true
    });
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/friend', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      yield _users.default.addFriend(req.body);
      res.json({
        success: true
      });
    } catch (error) {
      console.log(123, error);
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.delete('/', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      yield _users.default.deleteFriend(req.body);
      res.json({
        success: true
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/friendsById', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.findFriendsByUserId(req.query);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/userById', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.findUserById(req.query);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/findStrangerById', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.findStrangerById(req.query);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/findFriendDataById', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.findFriendDataById(req.query);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
router.put('/userData', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.updateUserData(req.body);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/current', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _users.default.getCurrent(req.body);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;