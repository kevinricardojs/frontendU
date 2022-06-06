import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Chip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import MenuIzquierdo from "./MenuIzquierdo";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoHorizontal from "../../assets/img/logoHorizontal.png";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { setUnLogged } from "../../slices/usuarioSlice";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  margin: {
    marginLeft: 20,
  },
}));

const Navegacion = () => {
  const classes = useStyles();
  const { usuario } = useSelector((state) => state.usuario);
  const { descripcion } = useSelector((state) =>
    state.sucursal.list.find((s) => s.id === usuario.sucursal)
  ) || { descripcion: "" };
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCerrarSesion = () => {
    window.localStorage.removeItem("token");
    dispatch(setUnLogged());
  };

  const toggleDrawer = () => {
    setOpenDrawer(false);
  };

  const openMenu = () => {
    setOpenDrawer(true);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={openMenu}
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ flexGrow: 1 }}>
            <img
              src={LogoHorizontal}
              alt="logoHorizontal"
              style={{ width: "130px" }}
            />
          </Link>
          <Box sx={{ flexGrow: 2 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Chip
              label={`Sucursal - ${descripcion}`}
              variant="filled"
              color="default"
              style={{ color: "white" }}
            />
            <Chip
              label={usuario.userName}
              variant="filled"
              color="default"
              style={{ color: "white" }}
            />
          </Box>
          <PersonOutlineIcon />
          <Tooltip title="Cerrar sesión">
            <IconButton
              color="inherit"
              component="span"
              onClick={handleCerrarSesion}
              size="large"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <MenuIzquierdo closeDrawer={toggleDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default Navegacion;
