"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedisGet = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _redis = require("../config/redis");
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var RedisGet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _redis.client.get('getAllData');
          case 3:
            data = _context.sent;
            if (data !== null) {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                data: JSON.parse(data),
                message: 'Note fetched from redis successfully'
              });
            } else {
              next();
            }
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'data Fetching fail'
            });
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function RedisGet(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.RedisGet = RedisGet;