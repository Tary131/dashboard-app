import { useState, FC } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoList: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const handleToggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border rounded-lg p-2 flex-grow"
          placeholder="Add new to-do..."
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between mb-2 ${todo.done ? 'line-through text-gray-400' : ''}`}
          >
            <span className="flex-grow">{todo.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleDone(todo.id)}
                className="text-green-500"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500"
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
