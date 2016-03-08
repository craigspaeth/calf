import mongojs from 'promised-mongo'

let { MONGOHQ_URL } = process.env

let db = mongojs(MONGOHQ_URL, ['campaigns'])

export default db
