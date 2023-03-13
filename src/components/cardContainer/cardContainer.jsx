import styles from './cardContainer.module.css';
import { useRouter } from 'next/router';

export default function CardContainer({ children }) {
  const router = useRouter();
  return(
    <div className={styles.cardContainer}>
      <h1>No tasks found</h1>
      <button onClick={() => router.push("/tasks/new")} name='Create New Task'>Create New Task</button>
    </div>
  )
}