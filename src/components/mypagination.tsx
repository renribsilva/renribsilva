// components/Mypagination.tsx
import React from "react";
import styles from "../styles/components.module.css";

interface MypaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxButtons?: number; // Adiciona uma opção para limitar a quantidade de botões de página
}

export default function Mypagination({ 
  totalPages, 
  currentPage, 
  onPageChange, 
  maxButtons = 1 // Define um valor padrão para maxButtons
}: MypaginationProps) {
  
  // Calcula os botões de página a serem exibidos
  const pageNumbers: (number | string)[] = [];

  // Sempre adiciona a primeira página
  pageNumbers.push(1);

  // Calcula o intervalo de páginas intermediárias
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(2, currentPage - half);
  let endPage = Math.min(totalPages - 1, currentPage + half);

  // Ajusta o início e o fim se necessário
  if (endPage - startPage + 1 < maxButtons - 1) {
    if (startPage === 2) {
      endPage = Math.min(startPage + (maxButtons - 2), totalPages - 1);
    } else {
      startPage = Math.max(endPage - (maxButtons - 2), 2);
    }
  }

  // Adiciona reticências se necessário
  if (startPage > 2) {
    pageNumbers.push("...");
  }

  // Adiciona as páginas intermediárias
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Adiciona reticências se necessário
  if (endPage < totalPages - 1) {
    pageNumbers.push("...");
  }

  // Sempre adiciona a última página
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <section className={styles.mypagination}>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={styles.mypaginationAnt}
      >
        Anterior
      </button>

      {/* Renderiza os botões de página com base nos cálculos acima */}
      {pageNumbers.map((page, index) => (
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`${styles.mypaginationButton} ${currentPage === page ? styles.activeButton : ""}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>{page}</span> // Renderiza reticências
        )
      ))}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={styles.mypaginationProx}
      >
        Próximo
      </button>
    </section>
  );
}
