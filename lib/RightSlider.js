'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RightSlider = function RightSlider(_ref) {
  var styling = _ref.styling,
      shown = _ref.shown,
      children = _ref.children,
      rotate = _ref.rotate;
  return _react2.default.createElement(
    'div',
    styling(['rightSlider', shown ? 'rightSliderShown' : null, rotate ? 'rightSliderRotate' : null, rotate && shown ? 'rightSliderRotateShown' : null]),
    children
  );
};
exports.default = RightSlider;