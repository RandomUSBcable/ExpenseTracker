import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.Header}>Header</div>
      <div className={styles.Body}>
        <div className={styles.TimeSelector}>
          <ul className={styles.TimeSelectorOptions}>
            <li className={styles.TimeSelectorOptionSingle}>past 7 days</li>
            <li className={styles.TimeSelectorOptionSingle}>past 28 days</li>
            <li className={styles.TimeSelectorOptionSingle}>this week</li>
            <li className={styles.TimeSelectorOptionSingle}>this month</li>
          </ul>
        </div>
        <div className={styles.Dashboard}>DATA</div>

        <div className={styles.Bills}>
          <div className={styles.BillsSelector}></div>
          <ul className={styles.BillsContainer}>
            <li className={styles.BillSingle}>Bill 1</li>
            <li className={styles.BillSingle}>Bill 2</li>
            <li className={styles.BillSingle}>Bill 3</li>
            <li className={styles.BillSingle}>Bill 4</li>
          </ul>
        </div>
      </div>
      <div className={styles.Footer}>
        <ul className={styles.FooterList}>
          <li>HOME</li>
          <li>Log Out</li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </main>
  );
}
