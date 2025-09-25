import React from "react";
import styles from "../styles/components.module.css";
import Calendar from "./svgs/calendar";
import Updated from "./svgs/updated";

const LOCALE = {
  langTag: "pt-BR",
} as const;

interface DatetimeProps {
  date: string;
  short?: boolean;
  semishort?: boolean; 
  icon?: string;
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

const FormattedDatetime = ({ date, short, semishort, icon }: DatetimeProps) => {
  const parsedDate = new Date(date);
  const formattedShortDate = formatShortDate(parsedDate);
  const formattedFullDate = formatFullDate(parsedDate);
  const formattedSemiShortDate = formatSemiShortDate(parsedDate); 

  return (
    <div className={styles.datetime}>
      <span>
        {icon === "created" && (
          <Calendar className={styles.calendar_icon} alt="data de publicação"/>
        )}
        {icon === "updated" && (
          <Updated className={styles.updated_icon} alt="data da última atualização"/>
        )}
      </span>
      <time dateTime={parsedDate.toISOString()}>
        {semishort ? formattedSemiShortDate : short ? formattedShortDate : formattedFullDate}
      </time>
    </div>
  );
};

export default function Datetime({ date, short, semishort, icon }: DatetimeProps) {
  return <FormattedDatetime date={date} short={short} semishort={semishort} icon={icon}/>;
}
