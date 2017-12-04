'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JSONDiff = require('./JSONDiff');

var _JSONDiff2 = _interopRequireDefault(_JSONDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DiffTab = function DiffTab(_ref) {
  var delta = _ref.delta,
      styling = _ref.styling,
      base16Theme = _ref.base16Theme,
      invertTheme = _ref.invertTheme,
      labelRenderer = _ref.labelRenderer,
      isWideLayout = _ref.isWideLayout;
  return _react2.default.createElement(_JSONDiff2.default, { delta: delta, styling: styling, base16Theme: base16Theme, invertTheme: invertTheme, labelRenderer: labelRenderer, isWideLayout: isWideLayout });
};

exports.default = DiffTab;