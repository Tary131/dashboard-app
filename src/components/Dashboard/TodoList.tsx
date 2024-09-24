import { useState, FC, useEffect } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'; // Your custom hook
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from '../../redux/slices/todoSlice';

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const { todos, loading, error } = useAppSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(fetchTodos(user.id));
    }
  }, [isLoggedIn, user, dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '' && user?.id) {
      dispatch(addTodo({ userId: user.id, text: newTodo }));
      setNewTodo('');
    }
  };

  const handleToggleDone = (id: string, done: boolean) => {
    if (user?.id) {
      dispatch(toggleTodo({ userId: user.id, id, done }));
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (user?.id) {
      dispatch(deleteTodo({ userId: user.id, id }));
    }
  };

  if (!isLoggedIn) return <p>Please log in to see your to-do list.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
        To-Do List
      </h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border rounded-lg p-2 flex-grow dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          placeholder="Add new to-do..."
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between mb-2 ${todo.done ? 'line-through text-gray-400 dark:text-gray-500' : 'dark:text-gray-200'}`}
          >
            <span className="flex-grow">{todo.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleDone(todo.id, todo.done)}
                className="text-green-500 dark:text-green-400"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 dark:text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
