'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNodesAsHtml = exports.parseHtmlAsNodes = exports.compressGzip = undefined;

let compressGzip = (() => {
  var _ref = _asyncToGenerator(function* (text) {
    return new Promise(function (resolve, reject) {
      _zlib2.default.gzip(Buffer.from(text), function (err, buffer) {
        if (err) {
          return reject(err);
        }

        return resolve(buffer);
      });
    });
  });

  return function compressGzip(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _parse = require('parse5');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function parseHtmlAsNodes(html) {
  return _parse2.default.parseFragment(html).childNodes;
}

function parseNodesAsHtml(nodes) {
  const treeAdapter = _parse2.default.treeAdapters.default;

  const htmlFragment = treeAdapter.createDocumentFragment();
  nodes.forEach(node => {
    treeAdapter.appendChild(htmlFragment, node);
  });

  return _parse2.default.serialize(htmlFragment);
}

exports.compressGzip = compressGzip;
exports.parseHtmlAsNodes = parseHtmlAsNodes;
exports.parseNodesAsHtml = parseNodesAsHtml;