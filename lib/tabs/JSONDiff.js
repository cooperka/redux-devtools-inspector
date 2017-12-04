'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _javascriptStringify = require('javascript-stringify');

var _javascriptStringify2 = _interopRequireDefault(_javascriptStringify);

var _getItemString = require('./getItemString');

var _getItemString2 = _interopRequireDefault(_getItemString);

var _getJsonTreeTheme = require('./getJsonTreeTheme');

var _getJsonTreeTheme2 = _interopRequireDefault(_getJsonTreeTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringifyAndShrink(val, isWideLayout) {
  if (val === null) {
    return 'null';
  }

  var str = (0, _javascriptStringify2.default)(val);
  if (typeof str === 'undefined') {
    return 'undefined';
  }

  if (isWideLayout) return str.length > 42 ? str.substr(0, 30) + '…' + str.substr(-10) : str;
  return str.length > 22 ? str.substr(0, 15) + '\u2026' + str.substr(-5) : str;
}


var expandFirstLevel = function expandFirstLevel(keyName, data, level) {
  return level <= 1;
};

function prepareDelta(value) {
  if (value && value._t === 'a') {
    var arrayDelta = value;
    var res = {};
    for (var key in arrayDelta) {
      if (key !== '_t') {
        if (key[0] === '_' && !arrayDelta[key.substr(1)]) {
          res[key.substr(1)] = arrayDelta[key];
        } else if (arrayDelta['_' + key]) {
          res[key] = [arrayDelta['_' + key][0], arrayDelta[key][0]];
        } else if (!arrayDelta['_' + key] && key[0] !== '_') {
          res[key] = arrayDelta[key];
        }
      }
    }
    return res;
  }

  return value;
}

var getStateFromProps = function getStateFromProps(props) {
  return {
    theme: (0, _getJsonTreeTheme2.default)(props.base16Theme)
  };
};

var JSONDiff = function (_PureComponent) {
  (0, _inherits3.default)(JSONDiff, _PureComponent);

  function JSONDiff(props) {
    (0, _classCallCheck3.default)(this, JSONDiff);

    var _this = (0, _possibleConstructorReturn3.default)(this, (JSONDiff.__proto__ || (0, _getPrototypeOf2.default)(JSONDiff)).call(this, props));

    _this.valueRenderer = function (raw, value) {
      var _this$props = _this.props,
          styling = _this$props.styling,
          isWideLayout = _this$props.isWideLayout;


      function renderSpan(name, body) {
        return _react2.default.createElement(
          'span',
          (0, _extends3.default)({ key: name }, styling(['diff', name])),
          body
        );
      }

      if (Array.isArray(value)) {
        switch (value.length) {
          case 1:
            return _react2.default.createElement(
              'span',
              styling('diffWrap'),
              renderSpan('diffAdd', stringifyAndShrink(value[0], isWideLayout))
            );
          case 2:
            return _react2.default.createElement(
              'span',
              styling('diffWrap'),
              renderSpan('diffUpdateFrom', stringifyAndShrink(value[0], isWideLayout)),
              renderSpan('diffUpdateArrow', ' => '),
              renderSpan('diffUpdateTo', stringifyAndShrink(value[1], isWideLayout))
            );
          case 3:
            return _react2.default.createElement(
              'span',
              styling('diffWrap'),
              renderSpan('diffRemove', stringifyAndShrink(value[0], isWideLayout))
            );
        }
      }

      return raw;
    };

    _this.getItemString = function (type, data) {
      return (0, _getItemString2.default)(_this.props.styling, type, data, _this.props.isWideLayout, true);
    };

    _this.state = getStateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(JSONDiff, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.base16Theme !== this.props.base16Theme) {
        this.setState(getStateFromProps(nextProps));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styling = _props.styling,
          labelRenderer = _props.labelRenderer,
          invertTheme = _props.invertTheme,
          delta = _props.delta;


      if (!delta) {
        return _react2.default.createElement(
          'div',
          styling('stateDiffEmpty'),
          '(states are equal)'
        );
      }

      return _react2.default.createElement(_reactJsonTree2.default, {
        labelRenderer: labelRenderer,
        invertTheme: invertTheme,
        theme: this.state.theme,
        data: delta,
        getItemString: this.getItemString,
        valueRenderer: this.valueRenderer,
        postprocessValue: prepareDelta,
        isCustomNode: Array.isArray,
        shouldExpandNode: expandFirstLevel,
        hideRoot: true
      });
    }
  }]);
  return JSONDiff;
}(_react.PureComponent);

exports.default = JSONDiff;