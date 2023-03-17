const task = require("../schemas/schema.js");
const wrapper = require("../middlewares/Trycatch.js");
const getAllTasks =wrapper(async (req, res)=>{
		const tasks = await task.find({});
		res.send(tasks);
})
const getTask = wrapper( async (req, res)=>{
		const data = await task.findOne({_id: req.params.id});
		if(!data){
			return res.status(404).json({msg:`Could not find any task with Id ${req.params.id}`});
		}
		res.json(data);
})
const deleteTask = wrapper( async (req, res)=>{
		const data = await task.findOneAndDelete({_id:req.params.id});
		if(!data){
			return res.status(404).json({msg:`Could not find any task with Id ${req.params.id}`});
		}
		res.json(data);
})
const addTask = wrapper( async (req, res)=>{
		const data = await task.create(req.body);
		res.send(data);
	
})
const updateTask = wrapper(async (req, res)=>{
		const data = await task.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators: true});
		if(!data) return res.status(404).json({msg:`could not find any task with Id ${req.params.id}`});
		res.status(200).json({data});
})
module.exports = {
	getAllTasks,
	getTask,
	deleteTask,
	addTask,
	updateTask
}