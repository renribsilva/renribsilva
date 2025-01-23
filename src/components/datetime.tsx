import React from "react";
import styles from "../styles/components.module.css";

const LOCALE = {
  langTag: "pt-BR",
} as const;

interface DatetimeProps {
  date: string;
  short?: boolean;
  semishort?: boolean; 
}

// "DD Mês AAAA"
const formatFullDate = (date: Date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString(LOCALE.langTag, { month: "short" });
  
  return `${day} ${month} ${year}`;
};

// "DD de Mês"
const formatShortDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString(LOCALE.langTag, { month: "short" });

  return `${day} de ${month}`; 
};

// "DD/MM/AA"
const formatSemiShortDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); 
  return `${day}/${month}/${year}`; // Formato "DD/MM/AA"
};

const FormattedDatetime = ({ date, short, semishort }: DatetimeProps) => {
  const parsedDate = new Date(date);
  const formattedShortDate = formatShortDate(parsedDate);
  const formattedFullDate = formatFullDate(parsedDate);
  const formattedSemiShortDate = formatSemiShortDate(parsedDate); 

  return (
    <time dateTime={parsedDate.toISOString()} className={styles.datetime}>
      {semishort ? formattedSemiShortDate : short ? formattedShortDate : formattedFullDate}
    </time>
  );
};

export default function Datetime({ date, short, semishort }: DatetimeProps) {
  return <FormattedDatetime date={date} short={short} semishort={semishort} />;
}
