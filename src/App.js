import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme";
import SnackNotification from "./components/Snack";

import { AppRoutes } from "./routes/AppRoutes";
import { Login } from "./pages/Login";
import { RutaPrivada } from "./routes/RutaPrivada";
import { RutaPublica } from "./routes/RutaPublica";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { validarTokenActual } from "./slices/sesionSlice";
import { LoaderGlobal } from "./components/LoaderGlobal";
import { fetchUsuarioData } from "./slices/usuarioSlice";

function App() {
  const { logged } = useSelector((state) => state.usuario);
  const { loadingGlobal } = useSelector((state) => state.loadingGlobal);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    dispatch(fetchUsuarioData());
    dispatch(validarTokenActual(token));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loadingGlobal ? (
            <LoaderGlobal />
          ) : (
            <Switch>
              <RutaPublica
                exact
                path="/login"
                component={Login}
                autenticado={logged}
              />
              <Suspense fallback={<h1>Loading</h1>}>
                <RutaPrivada
                  path="/"
                  component={AppRoutes}
                  autenticado={logged}
                />
              </Suspense>
            </Switch>
          )}
          <SnackNotification />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
