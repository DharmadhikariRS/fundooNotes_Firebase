"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = require("@hapi/joi");
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  Password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)('User', userSchema);
exports["default"] = _default;