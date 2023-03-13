
import { dbConnect } from "@/src/utils/dbConnection"
import Task from "@/src/models/task";

dbConnect();

export default async function handler(req, res) {

    console.log(req.query)

    const { method , body, query:{id} } = req;

    switch (method) {

      case 'PUT':
        try{
          // update task
          const task = await Task.findByIdAndUpdate(id, body, {
            new: true,
          });
        }
        catch(error){
          return res.status(400).json({success: false, message: 'Something went wrong', error})
        }


      case 'GET':
        try{
          // read one task
          const task = await Task.findById(id);
          if(!task){
              return res.status(400).json({success: false, message: 'Task not found'})
          }
          console.log(id)
          return res.status(200).json(task);
        }
        catch(error){
          return res.status(400).json({success: false, message: 'Something went wrong', error})
        }

      case 'DELETE':
        try{
          // delete task
          const deletedTask = await Task.findByIdAndDelete(id);
          if(!deletedTask){
              return res.status(400).json({success: false, message: 'Task not found'})
          }
          return res.status(200).json({success: true, message: 'Task deleted successfully'});
        }
        catch(error){
          return res.status(400).json({success: false, message: 'Something went wrong', error})
        }
    
      default:
        res.status(400).json({success: false})
    }

    return res.status(200).json({message: 'hello'})
}