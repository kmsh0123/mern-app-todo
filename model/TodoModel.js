import { model, Schema } from "mongoose";

const TodoSchema = new Schema(
    {
    title : {type : String,required : true}
    },
{
    timestamps : true
}
)

const TodoModel = model("Todo",TodoSchema);
export default TodoModel;