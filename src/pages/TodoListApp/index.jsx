import { useState } from "react";

import styles from "./TodoListApp.module.css";

function TodoListApp() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Learn JavaScript projects",
            completed: false,
        },
        {
            id: 2,
            text: "Make a to do list app",
            completed: false,
        },
        {
            id: 3,
            text: "Host it on online server",
            completed: true,
        },
        {
            id: 4,
            text: "Link it to your resume",
            completed: false,
        },
        {
            id: 5,
            text: "Get a software job",
            completed: false,
        },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    text: newTask.trim(),
                    completed: false,
                },
            ]);
            setNewTask("");
        }
    };

    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    const completedTasks = tasks.filter((task) => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;

    return (
        <div className={styles.todoContainer}>
            <div className={styles.todoCard}>
                <div className={styles.todoHeader}>
                    <h1 className={styles.todoTitle}>To-Do List 📋✏️</h1>
                </div>

                <div className={styles.inputSection}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập task mới..."
                        className={styles.taskInput}
                    />
                    <button onClick={addTask} className={styles.addButton}>
                        Thêm
                    </button>
                </div>

                <div className={styles.statsSection}>
                    <div className={styles.statsText}>
                        Tổng: {tasks.length} task(s) | Hoàn thành:{" "}
                        {completedTasks} task(s) | Còn lại: {remainingTasks}{" "}
                        task(s)
                    </div>
                </div>

                <div className={styles.taskList}>
                    {tasks.length === 0 ? (
                        <div className={styles.emptyState}>
                            Chưa có task nào. Hãy thêm task đầu tiên!
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`${styles.taskItem} ${
                                    task.completed ? styles.completed : ""
                                }`}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className={styles.taskCheckbox}
                                />
                                <span className={styles.taskText}>
                                    {task.text}
                                </span>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className={styles.deleteButton}
                                    aria-label="Xóa task">
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoListApp;
