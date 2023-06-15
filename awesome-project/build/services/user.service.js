"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.login = exports.forgotPassword = exports.Register = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userReset = require("../mailservice/user.reset.password");
var _rabbit = require("../utils/rabbit.producer");
//Login  users by Email
var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data, PasswordMatch, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              Email: body.Email
            });
          case 2:
            data = _context.sent;
            if (!(data !== null)) {
              _context.next = 15;
              break;
            }
            _context.next = 6;
            return _bcrypt["default"].compare(body.Password, data.Password);
          case 6:
            PasswordMatch = _context.sent;
            if (!PasswordMatch) {
              _context.next = 12;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              Email: data.Email,
              id: data._id
            }, process.env.SECRET_KEY);
            return _context.abrupt("return", token);
          case 12:
            throw new Error("Invalid Password");
          case 13:
            _context.next = 16;
            break;
          case 15:
            throw new Error("Invalid Email");
          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function login(_x) {
    return _ref.apply(this, arguments);
  };
}();

//create new user
exports.login = login;
var Register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var HashPassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt["default"].hash(body.Password, 12);
          case 2:
            HashPassword = _context2.sent;
            body.Password = HashPassword;
            _context2.next = 6;
            return _user["default"].create(body);
          case 6:
            data = _context2.sent;
            (0, _rabbit.producer)("User successfully created");
            return _context2.abrupt("return", data);
          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function Register(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//forgot password
exports.Register = Register;
var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              Email: body.Email
            });
          case 2:
            data = _context3.sent;
            if (!(data !== null)) {
              _context3.next = 9;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              Email: data.Email,
              id: data._id
            }, process.env.SECRET_KEY_RESET);
            (0, _userReset.sendMail)(body.Email, token);
            return _context3.abrupt("return");
          case 9:
            throw new Error("Invalid Email");
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function forgotPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

//update password
exports.forgotPassword = forgotPassword;
var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var HashPassword, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _bcrypt["default"].hash(body.Password, 12);
          case 2:
            HashPassword = _context4.sent;
            body.Password = HashPassword;
            _context4.next = 6;
            return _user["default"].findByIdAndUpdate({
              _id: body.id
            }, body, {
              "new": true
            });
          case 6:
            data = _context4.sent;
            return _context4.abrupt("return", data);
          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
exports.resetPassword = resetPassword;