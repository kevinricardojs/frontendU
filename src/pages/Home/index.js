import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { OpcionDesplegable } from "../../components/Navegacion/OpcionDesplegable";
import { routes } from "../../routes/routes";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const navegarA = (ruta) => {
    history.push(`${ruta}`);
  };
  const { usuario } = useSelector((state) => state.usuario);
  return (
    <Container>
      <Grid
        container
        component={Paper}
        spacing={4}
        marginTop={1}
        elevation={2}
        paddingBottom={4}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h3">
            Bienvenido {usuario.nombres} {usuario.apellidos}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h4">Menú de opciones</Typography>
        </Grid>
        {routes.map((pagina, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
            <Card elevation={4}>
              <CardContent>
                <OpcionDesplegable pagina={pagina} navegarA={navegarA} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
