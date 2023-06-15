"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var notesController = _interopRequireWildcard(require("../controllers/notes.controller"));
var _auth = require("../middlewares/auth.middleware");
var _redis = require("../middlewares/redis.middleware");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = _express["default"].Router();

//router to create a note
router.post('', _auth.userAuth, notesController.createNote);

//router to get all notes
router.get('', _auth.userAuth, _redis.RedisGet, notesController.getAllNotes);

//router to get  note bu id
router.get('/:_id', _auth.userAuth, notesController.getNote);

//route to update a note
router.put('/:_id', _auth.userAuth, notesController.updateNote);

//route to delete a note
router["delete"]('/:_id', _auth.userAuth, notesController.deleteNote);

////route to archieve a note
router.put('/:_id/archive', _auth.userAuth, notesController.archiveNote);

//route to trash a note
router.put('/:_id/trash', _auth.userAuth, notesController.trashNote);
var _default = router;
exports["default"] = _default;