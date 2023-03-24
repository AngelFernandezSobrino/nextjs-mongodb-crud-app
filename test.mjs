import mongoose from 'mongoose';


const BatchSchema = new mongoose.Schema({
    reactorId: {
        type: String
    },
    batchId: {
        type: String
    },
},{
    strict: false
});

(async () => {
    mongoose.set('debug', true);
    mongoose.set('bufferCommands', false);
    await mongoose.connect("mongodb://myUserAdmin:45470665Afm@192.168.100.34:27017/iiotsuite?authSource=admin", {
        bufferCommands: false,
        autoIndex: false,
    });
    console.log("connected");
    let batchModel = mongoose.model("production_batches", BatchSchema);

    console.log(batchModel);

    let batch = await batchModel.find({});
    console.log(batch);
    
})();