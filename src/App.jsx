import { useEffect, useState } from "react"
import Register from "./components/Register";

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")

  const API = "https://my-backend-ppne.onrender.com/api/todos"
  // const API = "https://localhost:7159/api/todos"
  const [isRegistering, setIsRegistering] = useState(false);
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const addTodo = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted: false })
    })
    .then(res => res.json())
    .then(todo => {
      setTodos([...todos, todo])
      setTitle("")
    })
  }

  const completeTodo = (id) => {
    fetch(`${API}/${id}`, { method: "PUT" })
      .then(() => {
        setTodos(todos.map(t =>
          t.id === id ? { ...t, isCompleted: true } : t
        ))
      })
  }

  const deleteTodo = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(t => t.id !== id)))
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Nút chuyển đổi chế độ */}
      <button 
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ marginBottom: 20, backgroundColor: isRegistering ? '#ccc' : '#4CAF50', color: 'white' }}
      >
        {isRegistering ? "Quay lại Todo App" : "Đăng ký tài khoản"}
      </button>

      <hr />

      {isRegistering ? (
        // Hiển thị giao diện Đăng ký
        <Register />
      ) : (
        // Hiển thị giao diện Todo cũ của bạn
        <>
          <h1>Todo App</h1>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Nhập việc cần làm"
          />
          <button onClick={addTodo}>Thêm</button>

          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <span style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                  {todo.title}
                </span>
                <button onClick={() => completeTodo(todo.id)}>✔</button>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App
