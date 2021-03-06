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

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _RightSlider = require('./RightSlider');

var _RightSlider2 = _interopRequireDefault(_RightSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUTTON_SKIP = 'Skip';
var BUTTON_JUMP = 'Jump';

var ActionListRow = function (_PureComponent) {
  (0, _inherits3.default)(ActionListRow, _PureComponent);

  function ActionListRow() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ActionListRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ActionListRow.__proto__ || (0, _getPrototypeOf2.default)(ActionListRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false }, _this.handleMouseEnter = function (e) {
      if (_this.hover) return;
      _this.handleMouseEnterDebounced(e.buttons);
    }, _this.handleMouseEnterDebounced = (0, _lodash2.default)(function (buttons) {
      if (buttons) return;
      _this.setState({ hover: true });
    }, 300), _this.handleMouseLeave = function () {
      _this.handleMouseEnterDebounced.cancel();
      if (_this.state.hover) _this.setState({ hover: false });
    }, _this.handleMouseDown = function (e) {
      if (e.target instanceof Element && e.target.className.indexOf('selectorButton') === 0) return;
      if (_this.handleMouseEnterDebounced) _this.handleMouseEnterDebounced.cancel();
      if (_this.state.hover) _this.setState({ hover: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ActionListRow, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          styling = _props.styling,
          isSelected = _props.isSelected,
          action = _props.action,
          isInitAction = _props.isInitAction,
          onSelect = _props.onSelect,
          timestamps = _props.timestamps,
          isSkipped = _props.isSkipped,
          isInFuture = _props.isInFuture;
      var hover = this.state.hover;

      var timeDelta = timestamps.current - timestamps.previous;
      var showButtons = hover && !isInitAction || isSkipped;

      var isButtonSelected = function isButtonSelected(btn) {
        return btn === BUTTON_SKIP && isSkipped;
      };

      var actionType = action.type;
      if (typeof actionType === 'undefined') actionType = '<UNDEFINED>';else if (actionType === null) actionType = '<NULL>';else actionType = actionType.toString() || '<EMPTY>';

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          onClick: onSelect,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onMouseDown: this.handleMouseDown
        }, styling(['actionListItem', isSelected ? 'actionListItemSelected' : null, isSkipped ? 'actionListItemSkipped' : null, isInFuture ? 'actionListFromFuture' : null], isSelected, action)),
        _react2.default.createElement(
          'div',
          styling(['actionListItemName', isSkipped ? 'actionListItemNameSkipped' : null]),
          actionType
        ),
        _react2.default.createElement(
          'div',
          styling('actionListItemButtons'),
          _react2.default.createElement(
            _RightSlider2.default,
            { styling: styling, shown: !showButtons, rotate: true },
            _react2.default.createElement(
              'div',
              styling('actionListItemTime'),
              timeDelta === 0 ? '+00:00:00' : (0, _dateformat2.default)(timeDelta, timestamps.previous ? '+MM:ss.L' : 'h:MM:ss.L')
            )
          ),
          _react2.default.createElement(
            _RightSlider2.default,
            { styling: styling, shown: showButtons, rotate: true },
            _react2.default.createElement(
              'div',
              styling('actionListItemSelector'),
              [BUTTON_JUMP, BUTTON_SKIP].map(function (btn) {
                return (!isInitAction || btn !== BUTTON_SKIP) && _react2.default.createElement(
                  'div',
                  (0, _extends3.default)({
                    key: btn,
                    onClick: _this2.handleButtonClick.bind(_this2, btn)
                  }, styling(['selectorButton', isButtonSelected(btn) ? 'selectorButtonSelected' : null, 'selectorButtonSmall'], isButtonSelected(btn), true)),
                  btn
                );
              })
            )
          )
        )
      );
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick(btn, e) {
      e.stopPropagation();

      switch (btn) {
        case BUTTON_SKIP:
          this.props.onToggleClick();
          break;
        case BUTTON_JUMP:
          this.props.onJumpClick();
          break;
      }
    }
  }]);
  return ActionListRow;
}(_react.PureComponent);

exports.default = ActionListRow;