'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getType;

var _immutable = require('immutable');

var _objType = require('react-json-tree/lib/objType');

var _objType2 = _interopRequireDefault(_objType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getType(value) {
  if (_immutable.List.isList(value)) {
    return 'Immutable List';
  } else if (_immutable.Map.isMap(value)) {
    return 'Immutable Map';
  } else if (_immutable.Set.isSet(value)) {
    return 'Immutable Set';
  } else if (_immutable.OrderedMap.isOrderedMap(value)) {
    return 'Immutable OrderedMap';
  } else if (_immutable.OrderedSet.isOrderedSet(value)) {
    return 'Immutable OrderedSet';
  } else if (_immutable.Stack.isStack(value)) {
    return 'Immutable Stack';
  } else if (_immutable.Seq.isSeq(value)) {
    return 'Immutable Seq';
  }

  return (0, _objType2.default)(value);
}