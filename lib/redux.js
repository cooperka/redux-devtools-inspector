'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.updateMonitorState = updateMonitorState;
exports.reducer = reducer;

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_MONITOR_STATE = '@@redux-devtools-inspector/UPDATE_MONITOR_STATE';


var DEFAULT_STATE = {
  selectedActionId: null,
  startActionId: null,
  inspectedActionPath: [],
  inspectedStatePath: [],
  tabName: 'Diff'
};

function updateMonitorState(monitorState) {
  return { type: UPDATE_MONITOR_STATE, monitorState: monitorState };
}

function reduceUpdateState(state, action) {
  return action.type === UPDATE_MONITOR_STATE ? (0, _extends3.default)({}, state, action.monitorState) : state;
}

function reducer(props) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_STATE;
  var action = arguments[2];

  return (0, _extends3.default)({}, reduceUpdateState(state, action));
}