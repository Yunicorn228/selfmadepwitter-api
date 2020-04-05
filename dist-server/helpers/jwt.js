"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var secret = process.env.JWT_SECRET;

var guard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];

    try {
      if (!token) {
        res.json({
          data: 'no token found'
        });
      } else {
        var decrypted = yield _jsonwebtoken.default.verify(token, secret);
        req.body.userId = decrypted.userId;
        return next();
      }
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function guard(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = guard;
exports.default = _default;