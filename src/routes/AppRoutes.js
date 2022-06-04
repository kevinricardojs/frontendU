import { Grid } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router";
import Navegacion from "../components/Navegacion";
import Home from "../pages/Home";
import { routes } from "./routes";

export const AppRoutes = () => {
  const routeComponents = routes.map((c) =>
    c.rutas.map(({ url, componente }, key) => (
      <Route exact path={url} component={componente} key={key} />
    ))
  );

  return (
    <>
      <Navegacion />
      <Grid container>
        <Switch>
          <Route exact path="/" component={Home} />
          {routeComponents}
        </Switch>
      </Grid>
    </>
  );
};
