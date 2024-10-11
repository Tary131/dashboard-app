import { useState, FC, useEffect } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectTodos,
  selectTodosLoading,
  selectTodosError,
  selectIsLoggedIn,
  selectUser,
} from '../../redux/selectors';
import { useTranslation } from 'react-i18next';
import { thunks } from '../../redux/thunks';
import Button from '../custom/Button';
import Input from '../custom/Input';

const TodoList: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const todos = useAppSelector(selectTodos);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);

  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(thunks.fetchTodos(user.id));
    }
  }, [isLoggedIn, user, dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '' && user?.id) {
      dispatch(thunks.addTodo({ userId: user.id, text: newTodo }));
      setNewTodo('');
    }
  };

  const handleToggleDone = (id: string, done: boolean) => {
    if (user?.id) {
      dispatch(thunks.toggleTodo({ userId: user.id, id, done }));
    }
  };

  const handleDeleteTodo = (id: string) => {
    if (user?.id) {
      dispatch(thunks.deleteTodo({ userId: user.id, id }));
    }
  };

  if (!isLoggedIn)
    return (
      <p className="text-gray-700 dark:text-gray-300">
        Please log in to see your to-do list.
      </p>
    );
  if (loading)
    return <p className="text-gray-700 dark:text-gray-300">Loading...</p>;
  if (error)
    return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;

  return (
    <div className="p-4 w-full">
      <div className="flex mb-4 items-center">
        <Input
          label=""
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow "
          placeholder={t('dashboard.add-new-todo')}
          aria-label="New to-do"
        />
        <Button
          label={t('dashboard.add')}
          onClick={handleAddTodo}
          className="ml-3"
        />
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
              todo.done
                ? 'bg-gray-200 dark:bg-gray-700 line-through text-gray-400 dark:text-gray-500'
                : 'bg-white dark:bg-gray-800 dark:text-gray-200'
            }`}
          >
            <span className="flex-grow">{todo.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleDone(todo.id, todo.done)}
                className="text-green-500 dark:text-green-400 hover:scale-105 transition-transform duration-200"
                title="Mark as done"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 dark:text-red-400 hover:scale-105 transition-transform duration-200"
                title="Delete"
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
