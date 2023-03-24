import mongoose from "mongoose";


const BatchSchema = new mongoose.Schema({
    reactorId: {
        type: String
    },
    batchId: {
        type: String
    },
},{
    strict: false
})

export default BatchSchema;