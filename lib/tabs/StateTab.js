'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _getItemString = require('./getItemString');

var _getItemString2 = _interopRequireDefault(_getItemString);

var _getJsonTreeTheme = require('./getJsonTreeTheme');

var _getJsonTreeTheme2 = _interopRequireDefault(_getJsonTreeTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStateFromProps = function getStateFromProps(props) {
  return {
    theme: (0, _getJsonTreeTheme2.default)(props.base16Theme)
  };
};

var StateTab = function (_PureComponent) {
  (0, _inherits3.default)(StateTab, _PureComponent);

  function StateTab(props) {
    (0, _classCallCheck3.default)(this, StateTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StateTab.__proto__ || (0, _getPrototypeOf2.default)(StateTab)).call(this, props));

    _this.getItemString = function (type, data) {
      return (0, _getItemString2.default)(_this.props.styling, type, data, _this.props.isWideLayout);
    };

    _this.state = getStateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(StateTab, [{
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
          labelRenderer = _props.labelRenderer,
          nextState = _props.nextState,
          invertTheme = _props.invertTheme;

      return _react2.default.createElement(_reactJsonTree2.default, {
        labelRenderer: labelRenderer,
        theme: this.state.theme,
        data: nextState,
        getItemString: this.getItemString,
        invertTheme: invertTheme,
        hideRoot: true
      });
    }
  }]);
  return StateTab;
}(_react.PureComponent);

exports.default = StateTab;