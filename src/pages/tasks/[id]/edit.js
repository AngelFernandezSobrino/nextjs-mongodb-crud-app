import { useState } from "react";
import { useRouter } from "next/router";
import FloatBtn from "@/src/components/floatBtn/floatBtn";
import styles from "../tasks.module.css";


export default function EditTask({task}) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateTask();
    console.table(newTask);
    router.push("/");
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: "PUT",
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
        <button type="submit">Save</button>
      </form>
    </div>
  )
    
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();

    return {
      props: {
        task,
      },
    };
  }
}