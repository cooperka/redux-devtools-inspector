'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getJsonTreeTheme;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJsonTreeTheme(base16Theme) {
  return {
    extend: base16Theme,
    nestedNode: function nestedNode(_ref, keyPath, nodeType, expanded) {
      var style = _ref.style;
      return {
        style: (0, _extends3.default)({}, style, {
          whiteSpace: expanded ? 'inherit' : 'nowrap'
        })
      };
    },
    nestedNodeItemString: function nestedNodeItemString(_ref2, keyPath, nodeType, expanded) {
      var style = _ref2.style;
      return {
        style: (0, _extends3.default)({}, style, {
          display: expanded ? 'none' : 'inline'
        })
      };
    }
  };
}