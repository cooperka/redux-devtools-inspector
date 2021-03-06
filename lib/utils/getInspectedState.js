'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = getInspectedState;

var _immutable = require('immutable');

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _getType = require('./getType');

var _getType2 = _interopRequireDefault(_getType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iterateToKey(obj, key) {
  // maybe there's a better way, dunno
  var idx = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      if (idx === key) return entry;
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
}


var entryRegex = /\[entry (\d+)\]/;

function getInspectedState(state, path, convertImmutable) {
  state = path && path.length ? (0, _defineProperty3.default)({}, path[path.length - 1], path.reduce(function (s, key) {
    if (!s) {
      return s;
    }
    if (_immutable.Iterable.isAssociative(s) || (0, _getType2.default)(s) === 'Map') {
      if (!s.has(key) && entryRegex.test(key)) {
        var match = key.match(entryRegex);
        var entry = iterateToKey(s, parseInt(match && match[1], 10));
        return entry && {
          '[key]': entry[0],
          '[value]': entry[1]
        };
      }
      return s.get(key);
    } else if ((0, _isIterable2.default)(s)) {
      return iterateToKey(s, parseInt(key, 10));
    }

    return s[key];
  }, state)) : state;

  if (convertImmutable) {
    try {
      state = (0, _immutable.fromJS)(state).toJS();
    } catch (e) {}
  }

  return state;
}