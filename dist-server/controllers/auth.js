"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var jwtSecret = process.env.JWT_SECRET;

var verifyToken = token => _jsonwebtoken.default.verify(token, jwtSecret);

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (data) {
    var {
      phone,
      password
    } = data;

    if (phone && password) {
      try {
        var user = yield _User.default.findOne({
          phone
        });

        if (user) {
          var passwordMatch = _bcryptjs.default.compareSync(password, user.password);

          if (passwordMatch) {
            var token = _jsonwebtoken.default.sign({
              userId: user._id
            }, jwtSecret);

            return {
              token,
              userId: user._id
            };
          }

          throw 'password does not match';
        }

        throw 'user does not found';
      } catch (error) {
        throw error;
      }
    } else {
      throw 'no phone or password';
    }
  });

  return function handleLogin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req) {
    var {
      firstName,
      lastName,
      email,
      phone,
      gender,
      password
    } = req.body;
    var existEmail = yield _User.default.findOne({
      email
    });
    var existPhone = yield _User.default.findOne({
      phone
    });
    if (existEmail && existPhone) throw 'email or phone has been taken';

    if (firstName && lastName && email && phone && gender && password) {
      try {
        var newUser = {
          firstName,
          lastName,
          email,
          phone,
          gender
        };

        var encryptedPassword = _bcryptjs.default.hashSync(password, 10);

        newUser.password = encryptedPassword;
        return _User.default.create(newUser);
      } catch (error) {
        throw error;
      }
    } else {
      throw 'missing information mofo';
    }
  });

  return function register(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var AuthController = {
  handleLogin,
  register,
  verifyToken
};
var _default = AuthController;
exports.default = _default;