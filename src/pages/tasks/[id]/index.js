import Error from "next/error";
import { useRouter } from "next/router";
import FloatBtn from "@/src/components/floatBtn/floatBtn";
import styles from '@/src/styles/Home.module.css'


export default function Task({task, error}) {

  const router = useRouter();

  const deleteTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  
  return(
    <>
      {error ? 
        <Error statusCode={error.statusCode} title={error.statusText} /> :
        <div className={styles.editContainer}>
          <FloatBtn
            content={"Back Home"}
            funn={() => router.push("/")}
          />
          <div className={styles.taskContainer} key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => router.push(`/tasks/${task._id}/edit`)} 
              name='Edit' >Edit</button>
            <button onClick={deleteTask} name='Delete'>Delete</button>
          </div>
        </div>
}
    </>
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

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}