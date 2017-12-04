'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = isIterable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isIterable(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && !Array.isArray(obj) && typeof obj[window.Symbol.iterator] === 'function';
}