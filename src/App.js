import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateId, setUpdateId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateId) {
      const updateTodo = todos.find((i) => i.id === updateId);
      const editedTodos = todos.map((t) =>
        t.id === updateTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(editedTodos);
      setUpdateId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleUpdate = (id) => {
    const updatedTodo = todos.find((i) => i.id === id);
    setTodo(updatedTodo.todo);
    setUpdateId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To Do List</h1>
        <form action="" className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit"> {updateId ? "edit" : "go"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>{" "}
              <button onClick={() => handleUpdate(t.id)}>edit</button>
              <button onClick={() => handleDelete(t.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
