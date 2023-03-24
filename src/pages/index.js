import styles from '../styles/Home.module.css'
import CardContainer from '../components/cardContainer/cardContainer'
import FloatBtn from '../components/floatBtn/floatBtn'
import { useRouter } from "next/router";

export default function Home({batches}) {

  const router = useRouter();

  console.log(batches);

  if(batches.length == 0) {
    return (
      <div className={styles.containerNoTask}>
      <CardContainer/>
      </div>

    )
  }
  return (
    <div className={styles.container}>
      {batches.map(task => (
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

import { DocumentCRUDService } from '../services/document';

export async function getServerSideProps(context) {

  const documentCRUDService = new DocumentCRUDService();

  const batchModel = await documentCRUDService.connect();

  let batches = await batchModel.find({}, {_id: 0}).lean();

  console.log(batches);
  return {
    props: {
      batches,
    }
  }
}