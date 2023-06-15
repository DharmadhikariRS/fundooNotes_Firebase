"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = sendMail;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var nodemailer = require("nodemailer");
var _require = require("googleapis"),
  google = _require.google;
var CLIENT_ID = '1020224368715-b92mjh1am08ohic481nm5klcsl5oc0s1.apps.googleusercontent.com';
var CLIENT_SECRET = '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';
var REDIRECT_URI = 'https://developers.google.com/oauthplayground';
var REFRESH_TOKEN = '1//04YXb70NBJ8jRCgYIARAAGAQSNwF-L9IrnonXNu8k-uH4SurkMcFIYi-BkLP6RGpUEAWhOErhAvk3w9XXW36p8WhJvtUClrqm_vs';
var OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
OAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});
var api = "http://localhost:3000/api/v1/";
function sendMail(_x, _x2) {
  return _sendMail.apply(this, arguments);
}
function _sendMail() {
  _sendMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(Email, token) {
    var acceessToken, transport, mailOptions, sentMailDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return OAuth2Client.getAccessToken();
          case 3:
            acceessToken = _context.sent;
            transport = nodemailer.createTransport({
              service: "gmail",
              auth: {
                type: "OAUTH2",
                user: "rushikesh1998sd@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: acceessToken
              }
            });
            mailOptions = {
              from: "rushikesh1998sd@gmail.com>",
              to: Email,
              subject: " mail via google api",
              html: "<h1>link for reset password: </h1><a href=\"http://localhost:3000/api/v1/users/resetPassword/".concat(token, "\"><h1>click here</h1></a>")
            };
            _context.next = 8;
            return transport.sendMail(mailOptions);
          case 8:
            sentMailDetails = _context.sent;
            return _context.abrupt("return", sentMailDetails);
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _sendMail.apply(this, arguments);
}