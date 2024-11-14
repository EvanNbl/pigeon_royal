import styles from "./page.module.css";
import "../styles/globals.css";
import Image from "next/image";
import logo from "../public/logo.svg";

export default function Home() {
  return (
    <div className={styles.body}>
      <Image src={logo} className={styles.svg} alt="Pigeon Royal" width="200" height="200" />
      <h1 className={styles.h1}>Maintenance en cours</h1>
      <p className={styles.p}>Notre site arrive bientôt !</p>   
    </div>
  );
}
