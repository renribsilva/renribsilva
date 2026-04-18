import Sobre from "../../../components/mdx/sobre.mdx"
import styles from "./sobre.module.css"

export default function SobrePage() {

  return (
    <section className={styles.sobre}>
      <Sobre/>
    </section>
  );
}
