import styles from './floatBtn.module.css';

export default function FloatBtn({funn,content}) {
  return (
    <div onClick={funn} className={styles.floatBtn}>
      <span>{content}</span>
    </div>
  );
}
