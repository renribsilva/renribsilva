import Link from "next/link"
import styles from "../styles/header.module.css"

const navItems: { label: string; page?: string }[] = [
  { label: '/textos', page: '/textos' }, 
  { label: '/rechetegues ', page: '/rechetegues' },
  { label: '/léxico', page: '/lexico' },
  { label: '/sobre', page: '/sobre' },
]

export default function Header () {
  return (
    <header className={styles.header}>
      <section className={styles.section1}>
        <Link href="/">
          <div>petricor</div>
        </Link>
      </section>
      <section className={styles.section2}>
        <ul>
          {navItems.map(({ label, page }) => (
            <li key={label}>
              <Link href={page}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </header>
  )
}