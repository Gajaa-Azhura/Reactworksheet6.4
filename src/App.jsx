import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">GitHub Users</h1>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <h2 className="username">{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
                View Profile
              </a>
            </div>
          ))
        ) : (
          <p className="loading">Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default App;