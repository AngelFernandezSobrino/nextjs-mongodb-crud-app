import styles from '../styles/Home.module.css'
import CardContainer from '../components/cardContainer/cardContainer'
import FloatBtn from '../components/floatBtn/floatBtn'
import { useRouter } from "next/router";

export default function Home({tasks}) {

  const router = useRouter();

  if(tasks.length === 0) {
    return (
      <div className={styles.containerNoTask}>
      <CardContainer/>
      </div>

    )
  }
  return (
    <div className={styles.container}>
      {tasks.map(task => (
        <div className={styles.taskContainer} key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => router.push(`/tasks/${task._id}`)} 
            name='View'>View</button>
        </div>
      ))}
      <FloatBtn 
        content = {"New Task"}
        funn={()=>router.push("/tasks/new") }/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()

  return {
    props: {
        tasks,
    }
  }
}