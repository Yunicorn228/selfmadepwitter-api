"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.sendStatus(200);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/register', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _auth.default.register(req);
      res.json({
        data,
        success: true
      });
    } catch (error) {
      res.json({
        error,
        success: false
      });
    }
  });

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/login', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var data = yield _auth.default.handleLogin(req.body);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        error,
        success: false
      });
    }
  });

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;