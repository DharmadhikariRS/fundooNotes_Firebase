"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = require("@hapi/joi");
var _mongoose = require("mongoose");
var NotesSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  isArchived: {
    type: Boolean,
    "default": false
  },
  isTrash: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)('Notes', NotesSchema);
exports["default"] = _default;