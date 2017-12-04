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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ActionListRow = require('./ActionListRow');

var _ActionListRow2 = _interopRequireDefault(_ActionListRow);

var _ActionListHeader = require('./ActionListHeader');

var _ActionListHeader2 = _interopRequireDefault(_ActionListHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTimestamps(actions, actionIds, actionId) {
  var idx = actionIds.indexOf(actionId);
  var prevActionId = actionIds[idx - 1];

  return {
    current: actions[actionId].timestamp,
    previous: idx ? actions[prevActionId].timestamp : 0
  };
}

var ActionList = function (_PureComponent) {
  (0, _inherits3.default)(ActionList, _PureComponent);

  function ActionList() {
    (0, _classCallCheck3.default)(this, ActionList);
    return (0, _possibleConstructorReturn3.default)(this, (ActionList.__proto__ || (0, _getPrototypeOf2.default)(ActionList)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToBottom(true);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.lastActionId !== prevProps.lastActionId) {
        this.scrollToBottom();
      }
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom(force) {
      var el = _reactDom2.default.findDOMNode(this.refs.rows);
      var scrollHeight = el.scrollHeight;
      if (force || Math.abs(scrollHeight - (el.scrollTop + el.offsetHeight)) < 50) {
        el.scrollTop = scrollHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styling = _props.styling,
          actions = _props.actions,
          actionIds = _props.actionIds,
          isWideLayout = _props.isWideLayout,
          onToggleAction = _props.onToggleAction,
          skippedActionIds = _props.skippedActionIds,
          selectedActionId = _props.selectedActionId,
          startActionId = _props.startActionId,
          onSelect = _props.onSelect,
          onSearch = _props.onSearch,
          searchValue = _props.searchValue,
          currentActionId = _props.currentActionId,
          onCommit = _props.onCommit,
          onSweep = _props.onSweep,
          onJumpToState = _props.onJumpToState;

      var lowerSearchValue = searchValue && searchValue.toLowerCase();
      var filteredActionIds = searchValue ? actionIds.filter(function (id) {
        return actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1;
      }) : actionIds;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          key: 'actionList'
        }, styling(['actionList', isWideLayout ? 'actionListWide' : null], isWideLayout)),
        _react2.default.createElement(_ActionListHeader2.default, { styling: styling,
          onSearch: onSearch,
          onCommit: onCommit,
          onSweep: onSweep,
          hasSkippedActions: skippedActionIds.length > 0,
          hasStagedActions: actionIds.length > 1 }),
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, styling('actionListRows'), { ref: 'rows' }),
          filteredActionIds.map(function (actionId) {
            return _react2.default.createElement(_ActionListRow2.default, { key: actionId,
              styling: styling,
              isInitAction: !actionId,
              isSelected: startActionId !== null && actionId >= startActionId && actionId <= selectedActionId || actionId === selectedActionId,
              isInFuture: actionId > currentActionId,
              onSelect: function (_onSelect) {
                function onSelect(_x) {
                  return _onSelect.apply(this, arguments);
                }

                onSelect.toString = function () {
                  return _onSelect.toString();
                };

                return onSelect;
              }(function (e) {
                return onSelect(e, actionId);
              }),
              timestamps: getTimestamps(actions, actionIds, actionId),
              action: actions[actionId].action,
              onToggleClick: function onToggleClick() {
                return onToggleAction(actionId);
              },
              onJumpClick: function onJumpClick() {
                return onJumpToState(actionId);
              },
              onCommitClick: function onCommitClick() {
                return onCommit(actionId);
              },
              isSkipped: skippedActionIds.indexOf(actionId) !== -1 });
          })
        )
      );
    }
  }]);
  return ActionList;
}(_react.PureComponent);

exports.default = ActionList;