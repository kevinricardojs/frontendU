import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const RutaPrivada = ({ autenticado, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(...props) =>
        autenticado ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

RutaPrivada.propTypes = {
  autenticado: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
