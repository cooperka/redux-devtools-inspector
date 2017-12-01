'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = createDiffPatcher;

var _jsondiffpatch = require('jsondiffpatch');

var _jsondiffpatch2 = _interopRequireDefault(_jsondiffpatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultObjectHash = function defaultObjectHash(o, idx) {
  return o === null && '$$null' || o && (o.id || o.id === 0) && '$$id:' + (0, _stringify2.default)(o.id) || o && (o._id || o._id === 0) && '$$_id:' + (0, _stringify2.default)(o._id) || '$$index:' + idx.toString();
};


var defaultPropertyFilter = function defaultPropertyFilter(name, context) {
  return typeof context.left[name] !== 'function' && typeof context.right[name] !== 'function';
};

var defaultDiffPatcher = _jsondiffpatch2.default.create({
  arrays: { detectMove: false },
  objectHash: defaultObjectHash,
  propertyFilter: defaultPropertyFilter
});

function createDiffPatcher(objectHash, propertyFilter) {
  if (!objectHash && !propertyFilter) {
    return defaultDiffPatcher;
  }

  return _jsondiffpatch2.default.create({
    arrays: { detectMove: false },
    objectHash: objectHash || defaultObjectHash,
    propertyFilter: propertyFilter || defaultPropertyFilter
  });
}