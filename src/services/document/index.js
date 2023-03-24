import mongoose from "mongoose";

mongoose.Types.ObjectId.prototype.toString = function () {
	return this.toString();
};

export class DocumentCRUDService {

	static modelCompiled = false;
	
	constructor() {}

	async connect() {
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
		

		mongoose.set('debug', true);
		mongoose.set('bufferCommands', false);
		await mongoose.connect("mongodb://myUserAdmin:45470665Afm@192.168.100.34:27017/iiotsuite?authSource=admin", {
			bufferCommands: false,
			autoIndex: false,
		});
		console.log("connected");
		this.batchModel = mongoose.models.production_batches || mongoose.model("production_batches", BatchSchema);
	
		console.log(this.batchModel);

		return this.batchModel;
	}

}