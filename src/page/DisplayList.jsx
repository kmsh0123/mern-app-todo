import React, { useState } from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../feature/api/TodoApi';
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';

const DisplayList = ({ item, index }) => {
  const bgColors = [
    'bg-blue-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-indigo-500'
  ];

  const bgColor = bgColors[index % bgColors.length];
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteTodo(id);
          console.log(data);
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting your item.',
            'error'
          );
        }
      }
    });
  };

  const handleUpdate = async (formData) => {
    try {
      const { data } = await updateTodo({
        id: item._id,
        title: formData.title
      });
      console.log('Updated item:', data);
      setIsModalOpen(false); // close the modal on success
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const openModal = () => {
    setValue("title", item?.title); // set the initial title when opening the modal
    setIsModalOpen(true);
  };

  return (
    <div className={`${bgColor} p-3 flex justify-between items-center mx-5 mt-1.5 rounded-lg`}>
      <h1>{item?.title}</h1>
      <div className='flex items-center gap-5 text-2xl'>
        <MdModeEdit onClick={openModal} />
        <MdDelete onClick={() => handleDelete(item?._id)} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl mb-4">Edit Todo</h2>
            {/* Handle submission manually */}
            <div>
              <input
                type="text"
                {...register("title", { required: true })}
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 p-2 rounded-md">Cancel</button>
                <button 
                  onClick={handleSubmit(handleUpdate)}  // Handle submit directly
                  className="bg-blue-500 text-white p-2 rounded-md">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayList;
