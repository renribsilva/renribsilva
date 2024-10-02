import styles from "../styles/components.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function Myhr({ marginTop = "30px" }) {
  return (
    <hr className={styles.myhr} style={{ marginTop }} />
  );
}

// Validação de props
Myhr.propTypes = {
  marginTop: PropTypes.string,
};
