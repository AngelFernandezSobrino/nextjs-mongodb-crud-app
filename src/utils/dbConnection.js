import {connect, connection} from 'mongoose'


const conn = {
    dbConnect: false
}

export async function dbConnect(){

    if(conn.dbConnect) return;

    const db = await connect(process.env.MONGODB_URL)
    
    console.log(db.connection.readyState)
    console.log('DB is connected to', db.connection.name)
    
}

connection.on('connected', () => {
    console.log('Mongoose is connected')
})

connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
})

connection.on('close', () => {
    console.log('Mongoose connection is closed')
})

connection.on('error', (err) => {
    console.log(err)
})