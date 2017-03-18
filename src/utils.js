import zlib from 'zlib'

import parse5 from 'parse5'

async function compressGzip(text) {
  return new Promise((resolve, reject) => {
    zlib.gzip(Buffer.from(text), (err, buffer) => {
      if (err) {
        return reject(err)
      }

      return resolve(buffer)
    })
  })
}

function parseHtmlAsNodes(html) {
  return parse5.parseFragment(html).childNodes
}

function parseNodesAsHtml(nodes) {
  const treeAdapter = parse5.treeAdapters.default

  const htmlFragment = treeAdapter.createDocumentFragment()
  nodes.forEach((node) => {
    treeAdapter.appendChild(htmlFragment, node)
  })

  return parse5.serialize(htmlFragment)
}

export { compressGzip, parseHtmlAsNodes, parseNodesAsHtml }
