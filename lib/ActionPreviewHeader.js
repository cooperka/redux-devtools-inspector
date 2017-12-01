'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionPreviewHeader = function ActionPreviewHeader(_ref) {
  var styling = _ref.styling,
      inspectedPath = _ref.inspectedPath,
      onInspectPath = _ref.onInspectPath,
      tabName = _ref.tabName,
      onSelectTab = _ref.onSelectTab,
      tabs = _ref.tabs;
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ key: 'previewHeader' }, styling('previewHeader')),
    _react2.default.createElement(
      'div',
      styling('tabSelector'),
      tabs.map(function (tab) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ onClick: function onClick() {
              return onSelectTab(tab.name);
            },
            key: tab.name
          }, styling(['selectorButton', tab.name === tabName ? 'selectorButtonSelected' : null], tab.name === tabName)),
          tab.name
        );
      })
    ),
    _react2.default.createElement(
      'div',
      styling('inspectedPath'),
      inspectedPath.length ? _react2.default.createElement(
        'span',
        styling('inspectedPathKey'),
        _react2.default.createElement(
          'a',
          (0, _extends3.default)({ onClick: function onClick() {
              return onInspectPath([]);
            }
          }, styling('inspectedPathKeyLink')),
          tabName
        )
      ) : tabName,
      inspectedPath.map(function (key, idx) {
        return idx === inspectedPath.length - 1 ? _react2.default.createElement(
          'span',
          { key: key },
          key
        ) : _react2.default.createElement(
          'span',
          (0, _extends3.default)({ key: key
          }, styling('inspectedPathKey')),
          _react2.default.createElement(
            'a',
            (0, _extends3.default)({ onClick: function onClick() {
                return onInspectPath(inspectedPath.slice(0, idx + 1));
              }
            }, styling('inspectedPathKeyLink')),
            key
          )
        );
      })
    )
  );
};
exports.default = ActionPreviewHeader;