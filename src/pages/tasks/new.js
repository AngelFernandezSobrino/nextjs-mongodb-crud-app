import styles from "./tasks.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import FloatBtn from "@/src/components/floatBtn/floatBtn";
        
export default function NewTask() {

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await createTask();
    console.table(newTask);
    router.push("/");
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

    
  return (
    <div className={styles.formContainer}>
      
      <FloatBtn 
        funn={()=>router.push("/") }
        content = {"Back Home"}/>
        
      <form className={styles.formBoxContainer} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" 
          required
          name="title" 
          id="title" 
          value={newTask.title}
          onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" 
          required
          name="description" 
          id="description" 
          value={newTask.description}
          onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}