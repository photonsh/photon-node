'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _highlighter = require('./highlighter');

var _highlighter2 = _interopRequireDefault(_highlighter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function photon() {
  let apiKey = '';

  return {
    setup: (options = {}) => {
      if (typeof options !== 'object' || options === null) {
        throw new Error('Setup\'s first argument (options) must be an object.');
      }

      if (options.apiKey) {
        apiKey = options.apiKey;
      }
    },
    highlight: (() => {
      var _ref = _asyncToGenerator(function* (document, options = {}) {
        if (typeof options !== 'object' || options === null) {
          throw new Error('Highlight\'s second argument (options) must be an object.');
        }

        if (apiKey === '' && options.apiKey === undefined) {
          throw new Error('Missing API key.');
        }

        return (0, _highlighter2.default)(document, _extends({ apiKey }, options));
      });

      return function highlight(_x) {
        return _ref.apply(this, arguments);
      };
    })()
  };
}

exports.default = photon();