"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose.default.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  gender: String,
  password: String
});

var Auth = _mongoose.default.model('Auth', AuthSchema);

var _default = Auth;
exports.default = _default;