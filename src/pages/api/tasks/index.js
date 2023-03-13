import { dbConnect } from "@/src/utils/dbConnection"
import Task from "@/src/models/task";

dbConnect();

export default async function handler(req, res) {

	const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        // read all tasks
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
      } 
      catch (error) {
        return res.status(400).json({ success: false, message: 'Something went wrong', error })
      }
      break;

		
		case 'POST':
			// create task
			const { title, description } = body;
			if (!title || !description) {
				return res.status(400).json({ success: false, message: 'All fields are required' })
			}
			try {
				const newTask = new Task({ title, description })
				await newTask.save()
				res.status(201).json({ success: true, message: 'Task created successfully', task: newTask })
			} catch (error) {
				res.status(400).json({ success: false, message: 'Something went wrong', error })
			}
			break;		
		
		default:
			res.status(400).json({ success: false })
			break;

	}
}