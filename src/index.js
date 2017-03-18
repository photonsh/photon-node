import highlighter from './highlighter'

function photon() {
  let apiKey = ''

  return {
    setup: (options = {}) => {
      if (typeof options !== 'object' || options === null) {
        throw new Error('Setup\'s first argument (options) must be an object.')
      }

      if (options.apiKey) {
        apiKey = options.apiKey
      }
    },
    highlight: async (document, options = {}) => {
      if (typeof options !== 'object' || options === null) {
        throw new Error('Highlight\'s second argument (options) must be an object.')
      }

      if (apiKey === '' && options.apiKey === undefined) {
        throw new Error('Missing API key.')
      }

      return highlighter(document, { apiKey, ...options })
    },
  }
}

export default photon()
