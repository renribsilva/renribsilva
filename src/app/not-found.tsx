import AppHeader from "../components/tsx/header"
import AppSidebar from "../components/tsx/sidebar"
import styles from "../app/(home)/home.module.css"

export default function Custum404() {
  return (
    <section>
      <div className={styles.home_up}>
        <AppHeader/>
      </div>
      <div className={styles.home_down}>
        <div className={styles.home_left}>
          <AppSidebar/>
        </div>
        <section>
          <h1>Eita!!!</h1>
          <p>A página que você procura não foi encontrada. Para encontrar a página que deseja,
            navegue no menu.
          </p>
        </section>
      </div>
    </section>

  )
}