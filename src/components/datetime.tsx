import React, { useEffect, useState } from "react";
import styles from "../styles/components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const LOCALE = {
  lang: "pt",
  langTag: "pt-BR",
} as const;

interface FormattedDatetimeProps {
  date: string;
  short?: boolean;
  semishort?: boolean;
}

interface DatetimeProps {
  date: string;
  short?: boolean;
  semishort?: boolean;
}

// Objeto para opções de formatação de tempo
const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

// Objeto para opções de formatação de data completa
const fullDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

// Objeto para opções de formatação semishort
const semiShortDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};

const FormattedDatetime = ({ date, short, semishort }: FormattedDatetimeProps) => {
  const parsedDate = new Date(date);

  const formattedDayMonth = parsedDate.toLocaleDateString(LOCALE.langTag, {
    day: "2-digit",
    month: "2-digit",
  });

  const formattedDayMonthYear = parsedDate.toLocaleDateString(LOCALE.langTag, semiShortDateOptions);
  const formattedFullDate = parsedDate.toLocaleDateString(LOCALE.langTag, fullDateOptions);
  const formattedTime = parsedDate.toLocaleTimeString(LOCALE.langTag, timeOptions);

  return (
    <span>
      {short ? (
        <time dateTime={parsedDate.toISOString()}>{formattedDayMonth}</time>
      ) : semishort ? (
        <time dateTime={parsedDate.toISOString()}>{formattedDayMonthYear}</time>
      ) : (
        <>
          <time dateTime={parsedDate.toISOString()}>{formattedFullDate}</time>
          <span aria-hidden="true"> às </span>
          <span>{formattedTime}</span>
        </>
      )}
    </span>
  );
};

export default function Datetime({ date, short }: DatetimeProps) {
  const [semishort, setSemishort] = useState<boolean>(false);

  useEffect(() => {
    // Verifica se o objeto window está disponível
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSemishort(window.innerWidth < 1080);
      }
    };

    // Chama a função uma vez na montagem do componente
    handleResize();

    // Adiciona o listener de resize
    window.addEventListener("resize", handleResize);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showCreatedText = !short && !semishort;

  return (
    <div className={styles.datetime}>
      <FontAwesomeIcon icon={faCalendar} className={styles.datetime_icon} />
      {showCreatedText && <span>criado em: </span>}
      <span>
        <FormattedDatetime date={date} short={short} semishort={semishort} />
      </span>
    </div>
  );
}
