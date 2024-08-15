import { Router } from "express";
import { CreateTodo, DeleteTodo, DeleteTodoAll, GetAllTodo, GetTodoId, UpdateTodo } from "../controller/TodoController.js";

const router = Router();

router.get("/getall",GetAllTodo);

router.get("/get/:id",GetTodoId);

router.post("/createTodo",CreateTodo);

router.patch("/updateTodo/:id",UpdateTodo);

router.delete("/deleteTodo/:id",DeleteTodo);

router.delete("/deleteTodoAll/",DeleteTodoAll);

export default router;