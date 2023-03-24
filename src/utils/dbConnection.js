import mongoose from 'mongoose'


const conn = {
    dbConnect: false
}

export async function dbConnect(){
    console.log('dbConnect called')
    if(conn.dbConnect) return;
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
    
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
})

mongoose.connection.on('close', () => {
    console.log('Mongoose connection is closed')
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})