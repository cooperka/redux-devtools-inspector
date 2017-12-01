'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

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

var _ActionPreviewHeader = require('./ActionPreviewHeader');

var _ActionPreviewHeader2 = _interopRequireDefault(_ActionPreviewHeader);

var _DiffTab = require('./tabs/DiffTab');

var _DiffTab2 = _interopRequireDefault(_DiffTab);

var _StateTab = require('./tabs/StateTab');

var _StateTab2 = _interopRequireDefault(_StateTab);

var _ActionTab = require('./tabs/ActionTab');

var _ActionTab2 = _interopRequireDefault(_ActionTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TABS = [{
  name: 'Action',
  component: _ActionTab2.default
}, {
  name: 'Diff',
  component: _DiffTab2.default
}, {
  name: 'State',
  component: _StateTab2.default
}];

var ActionPreview = function (_Component) {
  (0, _inherits3.default)(ActionPreview, _Component);

  function ActionPreview() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ActionPreview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ActionPreview.__proto__ || (0, _getPrototypeOf2.default)(ActionPreview)).call.apply(_ref, [this].concat(args))), _this), _this.labelRenderer = function (_ref2, nodeType, expanded) {
      var _ref3 = (0, _toArray3.default)(_ref2),
          key = _ref3[0],
          rest = _ref3.slice(1);

      var _this$props = _this.props,
          styling = _this$props.styling,
          onInspectPath = _this$props.onInspectPath,
          inspectedPath = _this$props.inspectedPath;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          styling('treeItemKey'),
          key
        ),
        _react2.default.createElement(
          'span',
          (0, _extends3.default)({}, styling('treeItemPin'), {
            onClick: function onClick() {
              return onInspectPath([].concat((0, _toConsumableArray3.default)(inspectedPath.slice(0, inspectedPath.length - 1)), (0, _toConsumableArray3.default)([key].concat((0, _toConsumableArray3.default)(rest)).reverse())));
            } }),
          '(pin)'
        ),
        !expanded && ': '
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ActionPreview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styling = _props.styling,
          delta = _props.delta,
          error = _props.error,
          nextState = _props.nextState,
          onInspectPath = _props.onInspectPath,
          inspectedPath = _props.inspectedPath,
          tabName = _props.tabName,
          isWideLayout = _props.isWideLayout,
          onSelectTab = _props.onSelectTab,
          action = _props.action,
          actions = _props.actions,
          selectedActionId = _props.selectedActionId,
          startActionId = _props.startActionId,
          computedStates = _props.computedStates,
          base16Theme = _props.base16Theme,
          invertTheme = _props.invertTheme,
          tabs = _props.tabs;


      var renderedTabs = typeof tabs === 'function' ? tabs(DEFAULT_TABS) : tabs ? tabs : DEFAULT_TABS;

      var tab = renderedTabs.find(function (tab) {
        return tab.name === tabName;
      });

      var TabComponent = void 0;
      if (tab) {
        TabComponent = tab.component;
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ key: 'actionPreview' }, styling('actionPreview')),
        _react2.default.createElement(_ActionPreviewHeader2.default, (0, _extends3.default)({
          tabs: renderedTabs
        }, { styling: styling, inspectedPath: inspectedPath, onInspectPath: onInspectPath, tabName: tabName, onSelectTab: onSelectTab })),
        !error && _react2.default.createElement(
          'div',
          (0, _extends3.default)({ key: 'actionPreviewContent' }, styling('actionPreviewContent')),
          TabComponent && _react2.default.createElement(TabComponent, (0, _extends3.default)({
            labelRenderer: this.labelRenderer
          }, {
            styling: styling,
            computedStates: computedStates,
            actions: actions,
            selectedActionId: selectedActionId,
            startActionId: startActionId,
            base16Theme: base16Theme,
            invertTheme: invertTheme,
            isWideLayout: isWideLayout,
            delta: delta,
            action: action,
            nextState: nextState
          }))
        ),
        error && _react2.default.createElement(
          'div',
          styling('stateError'),
          error
        )
      );
    }
  }]);
  return ActionPreview;
}(_react.Component);

ActionPreview.defaultProps = {
  tabName: 'Diff'
};
exports.default = ActionPreview;