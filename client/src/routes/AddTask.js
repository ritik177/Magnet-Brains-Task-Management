import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) navigate("/login");

  const token = user.token;

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://magnet-brains-task-management.onrender.com/api/tasks/add",
        { name, description, dueDate, priorityLevel },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.message) {
        setError("");
        navigate("/tasks");
      }
    } catch (err) {
      if (
        err.response.data.error ===
          "User is not authorized, try logging in again" ||
        err.response.data.error ===
          "User is not authorized and no token, try logging in"
      ) {
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/login");
      } else {
        setError("An error occurred while adding the task.");
      }
    }
  };

  return (
    <form onSubmit={handleAddTask} className="add-task">
      <h1>Add Task</h1>
      <p style={{ color: "#ff0000" }}>{error}</p>
      <div className="input">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter the task title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Description</label>
        <input
          type="text"
          placeholder="Describe your task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Due date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
        />
      </div>
      {/* <div className="select">
                <label>Priority Level</label>
                <select 
                    value={priorityLevel} 
                    onChange={e => setPriorityLevel(e.target.value)}
                >
                    <option value="" disabled>Select priority level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div> */}
      <div
        className="select"
        style={{
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            color: "#333",
          }}
        >
          Priority Level
        </label>

        <select
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
          style={{
            padding: "8px 12px",
            fontSize: "12px",
            border: "1px solid #000",
            borderRadius: "7px",
            background: "#f9f9f9",
            color: "#333",
            outline: "none",
            transition: "all 0.3s ease",
          }}
        >
          <option value="" disabled>
            Select priority level
          </option>
          <option value="low" style={{ color: "#28a800" }}>
            Low
          </option>
          <option value="medium" style={{ color: "#ffc107" }}>
            Medium
          </option>
          <option value="high" style={{ color: "#dc3545" }}>
            High
          </option>
        </select>
      </div>

      <button>Add Task</button>
    </form>
  );
};

export default AddTask;
