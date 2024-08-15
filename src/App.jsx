import React, { useEffect, useState } from 'react';
import DisplayList from './page/DisplayList';
import Pagination from './components/Pagination';
import axios from "axios";
import {useSearchParams} from "react-router-dom"
import { useCreateTodoMutation, useGetAllTodoQuery } from './feature/api/TodoApi';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const baseHeight = 525; // Base height percentage
  const totalPages = 100
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const page = searchParams.get("page") ? searchParams.get("page") : currentPage;
  const [pagesPerPage] = useState(5);
  const { data } = useGetAllTodoQuery(page)
  const [createTodo] = useCreateTodoMutation();

    const GetAllList = data?.getall;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Call createTodoHandler with the input value
      try {
        const newTodo = await createTodoHandler({ title: input });
        setList([...list, newTodo]);
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
      setInput('');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDeleteAll = () => {
    setList([]);
  };

  const createTodoHandler = async (todo) => {
    const { data } = await createTodo(todo);
    return data; // Return the created Todo data
  }

  const hasNextPage = GetAllList && GetAllList.length > 0;

  return (
    <div className="bg-gradient-to-r from-[#381fff] to-[#5d66ff] flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#161a2b] w-[520px] rounded-lg my-[128px] mx-auto pb-[32px]"
        style={{ minHeight: baseHeight }}
      >
        <h1 className="text-center p-5 text-white font-semibold text-2xl">What's the plan for Today?</h1>
        <div className="flex justify-center my-3">
          <input
            onChange={handleChange}
            type="text"
            className="p-2 pr-20 border-2 border-[#9601fa] bg-[#161a2b] outline-none text-white"
            placeholder="Add Todo"
            value={input}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-[#9601fa] to-[#650bff] p-3 rounded-e-md text-white"
          >
            Add Todo
          </button>
        </div>
    <div className="flex flex-col justify-start h-[270px]">
      {GetAllList && GetAllList.length > 0 ? (
        GetAllList.map((item, index) => (
          <DisplayList key={index} item={item} index={index} className="" />
        ))
        ) : (
          <div className='flex justify-center items-center text-white h-[270px]'>
            <h1>No data found. Please insert data.</h1>
          </div>
      )}
        </div>
        {data?.getall && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalPosts={list.length}
            pagesPerPage={pagesPerPage}
            setCurrentPage={setCurrentPage}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            hasNextPage={hasNextPage}
            data = {data}
          />
        )}
      </form>
    </div>
  );
};

export default App;
