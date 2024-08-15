import TodoModel from "../model/TodoModel.js";

export const CreateTodo = async (req,res) =>{
    const createTodo = new TodoModel(req.body);
    try {
    const savedTodo = await createTodo.save();
    res.status(201).json({
        success : true,
        message : `Todo create successfully`,
        savedTodo
    })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const GetAllTodo = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const getall = await TodoModel.find()
            .skip((page - 1) * limit) // Skip the number of documents
            .limit(Number(limit)); // Limit the number of documents

        const totalTodo = await TodoModel.countDocuments(); // Get total count of documents

        res.status(200).json({
            success: true,
            message: `Get All List`,
            page: Number(page),
            totalPages: Math.ceil(totalTodo / limit),
            totalTodo,
            getall
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const GetTodoId = async (req,res)=>{
  try {
    const getTodoId = await TodoModel.findById(req.params.id);
    res.status(200).json({
        success : true,
        message : `Get Todo List ${req.params.id}`,
        getTodoId
    })
  } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
  }
}

export const UpdateTodo = async (req,res)=>{
    try {
    const updateTodo = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new : true});
    res.status(200).json({
        success : true,
        message : `Todo update successfully`,
        updateTodo
    })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const DeleteTodo = async (req,res)=>{
    try {
    const deleteTodo = await TodoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success : true,
        message : `Delete Todo Successfully`,
        deleteTodo
    })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const DeleteTodoAll = async (req,res)=>{
    const {ids} = req.body;
    try {
        await TodoModel.deleteMany({_id : {$in : ids}})
        res.status(200).json({
            success : true,
            message : `Delete All Todo Successfully`
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}