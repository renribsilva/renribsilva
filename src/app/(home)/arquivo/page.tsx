import Link from "next/link";
import { getUniqueTags } from "../../../lib/getUniqueTags";
import { formatString } from "../../../lib/formatString";
import { getUniqueYears } from "../../../lib/getUniqueYear";
import styles from "./arquivo.module.css"
import ArchiveButton from "../../../components/tsx/archive_button";

const uniqueTags = getUniqueTags();
const uniqueYears = getUniqueYears();

export default function ArquivoPage() {
  return (
    <section>
      <div>
        <h2>por ano</h2>
        <ul className={styles.year_list}>
          {uniqueYears.map((year) => (
            <li key={year}>
              <Link href={`/arquivo/ano/${year}`} >
                <ArchiveButton>{year}</ArchiveButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>por tag</h2>
        <ul className={styles.tag_list}>
          {uniqueTags
          .sort((a, b) => b.frequency - a.frequency)
          .map(({ tag, frequency }) => {
            const formattedTag = formatString(tag); 
            return (
              <li key={formattedTag}>
                <Link href={`/arquivo/tag/${formattedTag}`} >
                  <ArchiveButton># {tag} ({frequency})</ArchiveButton>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
