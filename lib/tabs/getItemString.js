'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getType = require('../utils/getType');

var _getType2 = _interopRequireDefault(_getType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getShortTypeString(val, diff) {

  if (diff && Array.isArray(val)) {
    val = val[val.length === 2 ? 1 : 0];
  }

  var type = (0, _getType2.default)(val);

  switch (type) {
    case 'Immutable List':
    case 'Immutable Stack':
    case 'Immutable Seq':
      return '<I>' + val.size ? '[…]' : '[]';
    case 'Map':
      return val.size ? '{…}' : '{}';
    case 'WeakMap':
      return '{…}';
    case 'Set':
      return val.size ? '(…)' : '()';
    case 'WeakSet':
      return '(…)';
    case 'Immutable Map':
    case 'Immutable OrderedMap':
      return '<I>' + val.size ? '{…}' : '{}';
    case 'Immutable Set':
    case 'Immutable OrderedSet':
      return '<I>' + val.size ? '(…)' : '()';
    case 'Iterable':
      return '(…)';
    case 'Array':
      return val.length > 0 ? '[…]' : '[]';
    case 'Null':
      return 'null';
    case 'Undefined':
      return 'undef';
    case 'Error':
      return 'Error(' + getShortTypeString(val.message);
    case 'Object':
      return (0, _keys2.default)(val).length > 0 ? '{…}' : '{}';
    case 'Function':
      return 'fn';
    case 'String':
      return '"' + (val.substr(0, 10) + (val.length > 10 ? '…' : '')) + '"';
    case 'Symbol':
      return 'symbol';
    default:
      return val.toString();
  }
}

function getFirstEntries(data, limit, getEntryString) {
  var idx = 0,
      arr = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (idx === 3) {
        arr.push('…');
        break;
      };
      arr.push(getEntryString(entry));
      idx++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return arr.join(', ');
}

function getText(type, data, isWideLayout, isDiff) {
  var str = void 0;
  type = (0, _getType2.default)(data);

  switch (type) {
    case 'Immutable List':
    case 'Immutable Stack':
    case 'Immutable Seq':
      str = getFirstEntries(data, 3, function (entry) {
        return getShortTypeString(entry);
      });
      return '<I>[ ' + str + ' ]';
    case 'Map':
      str = getFirstEntries(data, 3, function (entry) {
        return getShortTypeString(entry[0]) + ' => ' + getShortTypeString(entry[1]);
      });
      return '{ ' + str + ' }';
    case 'WeakMap':
      return '{…}';
    case 'Set':
      str = getFirstEntries(data, 3, function (entry) {
        return getShortTypeString(entry);
      });
      return '( ' + str + ' )';
    case 'WeakSet':
      return '(…)';
    case 'Immutable Map':
    case 'Immutable OrderedMap':
      str = getFirstEntries(data, 3, function (entry) {
        return getShortTypeString(entry[0]) + ' => ' + getShortTypeString(entry[1]);
      });
      return '<I>{ ' + str + ' }';
    case 'Immutable Set':
    case 'Immutable OrderedSet':
      str = getFirstEntries(data, 3, function (entry) {
        return getShortTypeString(entry);
      });
      return '<I>( ' + str + ' )';
    case 'Object':
      var keys = (0, _keys2.default)(data);
      if (!isWideLayout) return keys.length ? '{…}' : '{}';

      str = keys.slice(0, 3).map(function (key) {
        return key + ': ' + getShortTypeString(data[key], isDiff);
      }).concat(keys.length > 3 ? ['…'] : []).join(', ');

      return '{ ' + str + ' }';
    case 'Array':
      if (!isWideLayout) return data.length ? '[…]' : '[]';

      str = data.slice(0, 4).map(function (val) {
        return getShortTypeString(val, isDiff);
      }).concat(data.length > 4 ? ['…'] : []).join(', ');

      return '[' + str + ']';
    default:
      return type;
  }
}

var getItemString = function getItemString(styling, type, data, isWideLayout) {
  var isDiff = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return _react2.default.createElement(
    'span',
    styling('treeItemHint'),
    getText(type, data, isWideLayout, isDiff)
  );
};

exports.default = getItemString;