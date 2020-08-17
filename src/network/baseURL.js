const bestURL = 'http://219.83.161.11:8030'

const crosURl = process.env.NODE_ENV === 'production' ? bestURL : '/api'

const updateURL = 'http://219.83.161.11:8030/view/'

export { bestURL, crosURl, updateURL }
