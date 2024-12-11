import PropTypes from "prop-types"; // Importando o pacote prop-types
import React from "react";

const Spacer = ({ size = 10 }) => (
  <span style={{ marginRight: `${size}px` }}></span>
);

Spacer.propTypes = {
  size: PropTypes.number // Valida que o valor de 'size' deve ser um número
};

export default Spacer;