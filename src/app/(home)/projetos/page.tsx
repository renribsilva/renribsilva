import Conjugador from "../../../components/mdx/conjugador.mdx"
import Glossario from "../../../components/mdx/glossário.mdx"
import styles from "./projetos.module.css"

export default function ProjetoPage() {

  return (
    <section className={styles.projetos}>
      <Conjugador/>
      <Glossario/>
    </section>
  );
}
