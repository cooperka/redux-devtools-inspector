'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _createStylingFromTheme = require('./utils/createStylingFromTheme');

var _ActionList = require('./ActionList');

var _ActionList2 = _interopRequireDefault(_ActionList);

var _ActionPreview = require('./ActionPreview');

var _ActionPreview2 = _interopRequireDefault(_ActionPreview);

var _getInspectedState = require('./utils/getInspectedState');

var _getInspectedState2 = _interopRequireDefault(_getInspectedState);

var _createDiffPatcher = require('./createDiffPatcher');

var _createDiffPatcher2 = _interopRequireDefault(_createDiffPatcher);

var _reactBase16Styling = require('react-base16-styling');

var _redux = require('./redux');

var _reduxDevtools = require('redux-devtools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commit = _reduxDevtools.ActionCreators.commit,
    sweep = _reduxDevtools.ActionCreators.sweep,
    toggleAction = _reduxDevtools.ActionCreators.toggleAction,
    jumpToAction = _reduxDevtools.ActionCreators.jumpToAction,
    jumpToState = _reduxDevtools.ActionCreators.jumpToState;


function getLastActionId(props) {
  return props.stagedActionIds[props.stagedActionIds.length - 1];
}

function getCurrentActionId(props, monitorState) {
  return monitorState.selectedActionId === null ? props.stagedActionIds[props.currentStateIndex] : monitorState.selectedActionId;
}

function getFromState(actionIndex, stagedActionIds, computedStates, monitorState) {
  var startActionId = monitorState.startActionId;

  if (startActionId === null) {
    return actionIndex > 0 ? computedStates[actionIndex - 1] : null;
  }
  var fromStateIdx = stagedActionIds.indexOf(startActionId - 1);
  if (fromStateIdx === -1) fromStateIdx = 0;
  return computedStates[fromStateIdx];
}

function createIntermediateState(props, monitorState) {
  var supportImmutable = props.supportImmutable,
      computedStates = props.computedStates,
      stagedActionIds = props.stagedActionIds,
      actions = props.actionsById,
      diffObjectHash = props.diffObjectHash,
      diffPropertyFilter = props.diffPropertyFilter;
  var inspectedStatePath = monitorState.inspectedStatePath,
      inspectedActionPath = monitorState.inspectedActionPath;

  var currentActionId = getCurrentActionId(props, monitorState);
  var currentAction = actions[currentActionId] && actions[currentActionId].action;

  var actionIndex = stagedActionIds.indexOf(currentActionId);
  var fromState = getFromState(actionIndex, stagedActionIds, computedStates, monitorState);
  var toState = computedStates[actionIndex];
  var error = toState ? toState.error : null;

  var fromInspectedState = !error && fromState ? (0, _getInspectedState2.default)(fromState.state, inspectedStatePath, supportImmutable) : null;
  var toInspectedState = !error && toState ? (0, _getInspectedState2.default)(toState.state, inspectedStatePath, supportImmutable) : null;
  var delta = fromInspectedState && toInspectedState ? (0, _createDiffPatcher2.default)(diffObjectHash, diffPropertyFilter).diff(fromInspectedState, toInspectedState) : null;

  return {
    delta: delta,
    nextState: toState && (0, _getInspectedState2.default)(toState.state, inspectedStatePath, false),
    action: (0, _getInspectedState2.default)(currentAction, inspectedActionPath, false),
    error: error
  };
}

function createThemeState(props) {
  var base16Theme = (0, _reactBase16Styling.getBase16Theme)(props.theme, _createStylingFromTheme.base16Themes);
  var styling = (0, _createStylingFromTheme.createStylingFromTheme)(props.theme, props.invertTheme);

  return { base16Theme: base16Theme, styling: styling };
}

var DevtoolsInspector = function (_PureComponent) {
  (0, _inherits3.default)(DevtoolsInspector, _PureComponent);

  function DevtoolsInspector(props) {
    (0, _classCallCheck3.default)(this, DevtoolsInspector);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DevtoolsInspector.__proto__ || (0, _getPrototypeOf2.default)(DevtoolsInspector)).call(this, props));

    _this.handleToggleAction = function (actionId) {
      _this.props.dispatch(toggleAction(actionId));
    };

    _this.handleJumpToState = function (actionId) {
      if (jumpToAction) {
        _this.props.dispatch(jumpToAction(actionId));
      } else {
        // Fallback for redux-devtools-instrument < 1.5
        var index = _this.props.stagedActionIds.indexOf(actionId);
        if (index !== -1) _this.props.dispatch(jumpToState(index));
      }
    };

    _this.handleCommit = function () {
      _this.props.dispatch(commit());
    };

    _this.handleSweep = function () {
      _this.props.dispatch(sweep());
    };

    _this.handleSearch = function (val) {
      _this.updateMonitorState({ searchValue: val });
    };

    _this.handleSelectAction = function (e, actionId) {
      var monitorState = _this.props.monitorState;

      var startActionId = void 0;
      var selectedActionId = void 0;

      if (e.shiftKey && monitorState.selectedActionId !== null) {
        if (monitorState.startActionId !== null) {
          if (actionId >= monitorState.startActionId) {
            startActionId = Math.min(monitorState.startActionId, monitorState.selectedActionId);
            selectedActionId = actionId;
          } else {
            selectedActionId = Math.max(monitorState.startActionId, monitorState.selectedActionId);
            startActionId = actionId;
          }
        } else {
          startActionId = Math.min(actionId, monitorState.selectedActionId);
          selectedActionId = Math.max(actionId, monitorState.selectedActionId);
        }
      } else {
        startActionId = null;
        if (actionId === monitorState.selectedActionId || monitorState.startActionId !== null) {
          selectedActionId = null;
        } else {
          selectedActionId = actionId;
        }
      }

      _this.updateMonitorState({ startActionId: startActionId, selectedActionId: selectedActionId });
    };

    _this.handleInspectPath = function (pathType, path) {
      _this.updateMonitorState((0, _defineProperty3.default)({}, pathType, path));
    };

    _this.handleSelectTab = function (tabName) {
      _this.updateMonitorState({ tabName: tabName });
    };

    _this.state = (0, _extends3.default)({}, createIntermediateState(props, props.monitorState), {
      isWideLayout: false,
      themeState: createThemeState(props)
    });
    return _this;
  }

  (0, _createClass3.default)(DevtoolsInspector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSizeMode();
      this.updateSizeTimeout = setInterval(this.updateSizeMode.bind(this), 150);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.updateSizeTimeout);
    }
  }, {
    key: 'updateMonitorState',
    value: function updateMonitorState(monitorState) {
      this.props.dispatch((0, _redux.updateMonitorState)(monitorState));
    }
  }, {
    key: 'updateSizeMode',
    value: function updateSizeMode() {
      var isWideLayout = this.refs.inspector.offsetWidth > 500;

      if (isWideLayout !== this.state.isWideLayout) {
        this.setState({ isWideLayout: isWideLayout });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextMonitorState = nextProps.monitorState;
      var monitorState = this.props.monitorState;

      if (getCurrentActionId(this.props, monitorState) !== getCurrentActionId(nextProps, nextMonitorState) || monitorState.startActionId !== nextMonitorState.startActionId || monitorState.inspectedStatePath !== nextMonitorState.inspectedStatePath || monitorState.inspectedActionPath !== nextMonitorState.inspectedActionPath) {
        this.setState(createIntermediateState(nextProps, nextMonitorState));
      }

      if (this.props.theme !== nextProps.theme || this.props.invertTheme !== nextProps.invertTheme) {
        this.setState({ themeState: createThemeState(nextProps) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          actionIds = _props.stagedActionIds,
          actions = _props.actionsById,
          computedStates = _props.computedStates,
          tabs = _props.tabs,
          invertTheme = _props.invertTheme,
          skippedActionIds = _props.skippedActionIds,
          currentStateIndex = _props.currentStateIndex,
          monitorState = _props.monitorState;
      var selectedActionId = monitorState.selectedActionId,
          startActionId = monitorState.startActionId,
          searchValue = monitorState.searchValue,
          tabName = monitorState.tabName;

      var inspectedPathType = tabName === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';
      var _state = this.state,
          themeState = _state.themeState,
          isWideLayout = _state.isWideLayout,
          action = _state.action,
          nextState = _state.nextState,
          delta = _state.delta,
          error = _state.error;
      var base16Theme = themeState.base16Theme,
          styling = themeState.styling;


      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ key: 'inspector',
          ref: 'inspector'
        }, styling(['inspector', isWideLayout ? 'inspectorWide' : null], isWideLayout)),
        _react2.default.createElement(_ActionList2.default, (0, _extends3.default)({
          actions: actions, actionIds: actionIds, isWideLayout: isWideLayout, searchValue: searchValue, selectedActionId: selectedActionId, startActionId: startActionId
        }, {
          styling: styling,
          onSearch: this.handleSearch,
          onSelect: this.handleSelectAction,
          onToggleAction: this.handleToggleAction,
          onJumpToState: this.handleJumpToState,
          onCommit: this.handleCommit,
          onSweep: this.handleSweep,
          skippedActionIds: skippedActionIds,
          currentActionId: actionIds[currentStateIndex],
          lastActionId: getLastActionId(this.props) })),
        _react2.default.createElement(_ActionPreview2.default, (0, _extends3.default)({
          base16Theme: base16Theme, invertTheme: invertTheme, isWideLayout: isWideLayout, tabs: tabs, tabName: tabName, delta: delta, error: error, nextState: nextState,
          computedStates: computedStates, action: action, actions: actions, selectedActionId: selectedActionId, startActionId: startActionId
        }, {
          styling: styling,
          onInspectPath: this.handleInspectPath.bind(this, inspectedPathType),
          inspectedPath: monitorState[inspectedPathType],
          onSelectTab: this.handleSelectTab }))
      );
    }
  }]);
  return DevtoolsInspector;
}(_react.PureComponent);

DevtoolsInspector.update = _redux.reducer;
DevtoolsInspector.defaultProps = {
  select: function select(state) {
    return state;
  },
  supportImmutable: false,
  theme: 'inspector',
  invertTheme: true
};
exports.default = DevtoolsInspector;