import mongojs from 'promised-mongo'

const { MONGOHQ_URL } = process.env

const db = mongojs(MONGOHQ_URL, ['campaigns'])

export default db
