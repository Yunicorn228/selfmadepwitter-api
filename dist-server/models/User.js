"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.default.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  gender: String,
  password: String,
  friends: [String]
});

var Users = _mongoose.default.model('Users', UserSchema);

var _default = Users;
exports.default = _default;