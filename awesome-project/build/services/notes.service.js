"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.trashNote = exports.getNote = exports.getAllNotes = exports.deleteNote = exports.createNote = exports.archiveNote = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _notes = _interopRequireDefault(require("../models/notes.model"));
var _redis = require("../config/redis");
//create a new note
var createNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _redis.client.del('getAllData');
          case 2:
            _context.next = 4;
            return _notes["default"].create(body);
          case 4:
            data = _context.sent;
            return _context.abrupt("return", data);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function createNote(_x) {
    return _ref.apply(this, arguments);
  };
}();

//get all notes
exports.createNote = createNote;
var getAllNotes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var getNoteDetails, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _notes["default"].find({
              userId: body.userId
            });
          case 2:
            getNoteDetails = _context2.sent;
            _context2.next = 5;
            return _redis.client.set('getAllData', JSON.stringify(getNoteDetails));
          case 5:
            _context2.next = 7;
            return _notes["default"].find({
              userId: body.userId
            });
          case 7:
            data = _context2.sent;
            return _context2.abrupt("return", data);
          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getAllNotes(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//get note bu ID
exports.getAllNotes = getAllNotes;
var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _notes["default"].findOne({
              _id: _id,
              userId: body.userId
            });
          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getNote(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

//update a note
exports.getNote = getNote;
var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _notes["default"].findByIdAndUpdate({
              _id: _id,
              userId: body.userId
            }, body, {
              "new": true
            });
          case 2:
            data = _context4.sent;
            return _context4.abrupt("return", data);
          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function updateNote(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

//delete a Single note
exports.updateNote = updateNote;
var deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_id, body) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _notes["default"].findByIdAndDelete({
              _id: _id,
              userId: body.userId
            });
          case 2:
            return _context5.abrupt("return", '');
          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function deleteNote(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

//archieve a note
exports.deleteNote = deleteNote;
var archiveNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_id, body) {
    var note, isArchived, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _notes["default"].findOne({
              _id: _id,
              userId: body.userId
            });
          case 2:
            note = _context6.sent;
            isArchived = note.isArchived === false ? true : false;
            _context6.next = 6;
            return _notes["default"].findByIdAndUpdate({
              _id: _id
            }, {
              isArchived: isArchived
            }, {
              "new": true
            });
          case 6:
            data = _context6.sent;
            return _context6.abrupt("return", data);
          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function archiveNote(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

//trash a note
exports.archiveNote = archiveNote;
var trashNote = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id, body) {
    var note, isTrash, data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _notes["default"].findOne({
              _id: _id,
              userId: body.userId
            });
          case 2:
            note = _context7.sent;
            isTrash = note.isTrash === false ? true : false;
            _context7.next = 6;
            return _notes["default"].findByIdAndUpdate({
              _id: _id
            }, {
              isTrash: isTrash
            }, {
              "new": true
            });
          case 6:
            data = _context7.sent;
            return _context7.abrupt("return", data);
          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function trashNote(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
exports.trashNote = trashNote;