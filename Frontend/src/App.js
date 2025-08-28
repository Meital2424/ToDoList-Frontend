import React, { useEffect, useState } from 'react';
import service from './service';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    if (newTodo.trim()) {
      const taskName = newTodo; 
      setNewTodo(""); 
      // console.error("newTodo2:", newTodo);
      try {
        await service.addTask({ Name: taskName, IsComplete: false });
        await getTodos(); 
        // console.error("newTodo1:", newTodo);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  }

  const updateCompleted = async (todo) => {
      const updatedItem = {
          id: todo.id,
          name: todo.name,
          isComplete: !todo.isComplete
      };
  
      await service.setCompleted(todo.id, updatedItem);
      await getTodos();
  };



  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" checked={todo.isComplete} onChange={() => updateCompleted(todo)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;