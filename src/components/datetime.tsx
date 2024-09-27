import styles from "../styles/index.module.css"

const LOCALE = {
  lang: "pt", // html lang code. Set this empty and default will be "en"
  langTag: ["pt-BR"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

// Define a interface para as props do componente FormattedDatetime
interface FormattedDatetimeProps {
  date: string; // ou Date
  mod?: string; // Torna 'mod' opcional
  showDayMonth?: boolean; // Nova propriedade opcional
}

// Componente FormattedDatetime
const FormattedDatetime: React.FC<FormattedDatetimeProps> = ({ date, mod, showDayMonth }) => {
  const myDatetime = new Date(mod && new Date(mod) > new Date(date) ? mod : date);
  
  // Formatação para DD-MM
  const dayMonth = myDatetime.toLocaleDateString(LOCALE.langTag, {
    day: "2-digit",
    month: "2-digit",
  });

  // Formatação padrão para data e hora
  const mydate = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const mytime = myDatetime.toLocaleTimeString(LOCALE.langTag, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span>
      {showDayMonth ? (
        <time dateTime={myDatetime.toISOString()}>{dayMonth}</time>
      ) : (
        <>
          <time dateTime={myDatetime.toISOString()}>{mydate}</time>
          <span aria-hidden="true"> às </span>
          <span>{mytime}</span>
        </>
      )}
    </span>
  );
};

// Define a interface para as props do componente Datetime
interface DatetimeProps {
  date: string; // ou Date
  mod?: string; // Torna 'mod' opcional
  showDayMonth?: boolean; // Nova propriedade opcional
}

export default function Datetime({ date, mod, showDayMonth }: DatetimeProps) {
  const isModified = mod && new Date(mod) > new Date(date); // Comparação direta para evitar problemas
  
  return (
    <div>
      {!showDayMonth && (
        <span className={styles.datetime}>{isModified ? "atualizado em: " : "criado em: "}</span>
      )}
      <span>
        <FormattedDatetime date={date} mod={mod} showDayMonth={showDayMonth} />
      </span>
    </div>
  );
}
