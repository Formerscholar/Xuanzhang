const bestURL = 'http://219.83.161.11:8030'

const crosURl = process.env.NODE_ENV === 'production' ? bestURL : '/api'

export { bestURL, crosURl }
