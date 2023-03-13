import { Schema, models, model } from "mongoose";


const TaskSchema = new Schema({
    title: {
        type: String,
        required: [ true , "Title is required"],
        unique: true,
        trim: true,
        maxlenght: [ 20 , "Title can't be more than 20 characters"],
    },
    description: {
        type: String,
        required: [ true , "Description is required"],
        unique: true,
        trim: true,
        maxlenght: [ 200 , "Description can't be more than 200 characters"],
    },
},{
    timestamps: true,
    versionKey: false,
})

export default models.Task || model("Task", TaskSchema)