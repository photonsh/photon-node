import axios from 'axios'

import { compressGzip, parseHtmlAsNodes, parseNodesAsHtml } from './utils'

async function highlighter(document, options) {
  const apiKey = options.apiKey

  async function sendSnippet(snippet) {
    const compressedSnippetBuffer = await compressGzip(snippet)

    const highlightedSnippet = axios({
      url: 'https://api.photon.sh/snippets',
      method: 'post',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip',
        'Accept-Encoding': 'gzip',
        Library: 'nodejs',
      },
      data: new Uint8Array(compressedSnippetBuffer),
    }).then((response) => response.data)

    return highlightedSnippet
  }

  async function walkNode(node) {
    let newNode = node

    if (
      node.nodeName === 'pre'
      && node.childNodes !== undefined
      && node.childNodes.length === 1
      && (node.childNodes[0].nodeName === 'code' || node.childNodes[0].nodeName === 'samp')
      && node.childNodes[0].attrs !== undefined
      && node.childNodes[0].attrs.length
      && node.childNodes[0].attrs.find((attr) => (attr.name === 'class' && (/\blang(?:uage)?-([\w-]+)\b/i).test(attr.value)))
      && node.childNodes[0].childNodes !== undefined
      && node.childNodes[0].childNodes.length === 1
      && node.childNodes[0].childNodes[0].value !== undefined
      && node.childNodes[0].childNodes[0].value !== ''
    ) {
      const highlightedSnippet = await sendSnippet(parseNodesAsHtml([node.childNodes[0]]))

      const highlightedNode = parseHtmlAsNodes(highlightedSnippet)[0]

      highlightedNode.parentNode = node.parentNode

      if (highlightedNode.nodeName === 'figure') {
        newNode = highlightedNode
      } else {
        newNode.childNodes[0] = highlightedNode
      }
    } else if (node.nodeName !== 'pre' && node.childNodes !== undefined && node.childNodes.length) {
      newNode.childNodes = await Promise.all(node.childNodes.map(walkNode))
    }

    return newNode
  }

  const nodes = parseHtmlAsNodes(document)

  return parseNodesAsHtml(await Promise.all(nodes.map(walkNode)))
}

export default highlighter
