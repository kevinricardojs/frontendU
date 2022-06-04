import { Box, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { usuario } = useSelector((state) => state.usuario);
  return (
    <Container>
      <Box boxShadow={2} height="200px" padding="20px">
        <h1>Bienvenido {usuario.nombre}</h1>
      </Box>
    </Container>
  );
};

export default Home;
