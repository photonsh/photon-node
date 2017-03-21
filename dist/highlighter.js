'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let highlighter = (() => {
  var _ref = _asyncToGenerator(function* (document, options) {
    let sendSnippet = (() => {
      var _ref2 = _asyncToGenerator(function* (snippet) {
        const compressedSnippetBuffer = yield (0, _utils.compressGzip)(snippet);

        const highlightedSnippet = (0, _axios2.default)({
          url: 'https://api.photon.sh/snippets',
          method: 'post',
          headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'text/html',
            'Content-Encoding': 'gzip',
            'Accept-Encoding': 'gzip',
            Library: 'nodejs'
          },
          data: new Uint8Array(compressedSnippetBuffer)
        }).then(function (response) {
          return response.data;
        });

        return highlightedSnippet;
      });

      return function sendSnippet(_x3) {
        return _ref2.apply(this, arguments);
      };
    })();

    let walkNode = (() => {
      var _ref3 = _asyncToGenerator(function* (node) {
        let newNode = node;

        if (node.nodeName === 'pre' && node.childNodes !== undefined && node.childNodes.length === 1 && (node.childNodes[0].nodeName === 'code' || node.childNodes[0].nodeName === 'samp') && node.childNodes[0].attrs !== undefined && node.childNodes[0].attrs.length && node.childNodes[0].attrs.find(function (attr) {
          return attr.name === 'class' && /\blang(?:uage)?-([\w-]+)\b/i.test(attr.value);
        }) && node.childNodes[0].childNodes !== undefined && node.childNodes[0].childNodes.length === 1 && node.childNodes[0].childNodes[0].value !== undefined && node.childNodes[0].childNodes[0].value !== '') {
          const highlightedSnippet = yield sendSnippet((0, _utils.parseNodesAsHtml)([node.childNodes[0]]));

          const highlightedNode = (0, _utils.parseHtmlAsNodes)(highlightedSnippet)[0];

          highlightedNode.parentNode = node.parentNode;

          if (highlightedNode.nodeName === 'div') {
            newNode = highlightedNode;
          } else {
            newNode.childNodes[0] = highlightedNode;
          }
        } else if (node.nodeName !== 'pre' && node.childNodes !== undefined && node.childNodes.length) {
          newNode.childNodes = yield Promise.all(node.childNodes.map(walkNode));
        }

        return newNode;
      });

      return function walkNode(_x4) {
        return _ref3.apply(this, arguments);
      };
    })();

    const apiKey = options.apiKey;

    const nodes = (0, _utils.parseHtmlAsNodes)(document);

    return (0, _utils.parseNodesAsHtml)((yield Promise.all(nodes.map(walkNode))));
  });

  return function highlighter(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = highlighter;