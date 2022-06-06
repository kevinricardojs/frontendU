import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { AccountBox, Email, MenuOpen } from "@mui/icons-material";
import { OpcionDesplegable } from "./OpcionDesplegable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { routes } from "../../routes/routes";
import { fetchList as fetchSucursales } from "../../slices/configuraciones/sucursalesSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MenuIzquierdo = ({ openDrawer, closeDrawer }) => {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.usuario);
  const { descripcion } = useSelector((state) =>
    state.sucursal.list.find((s) => s.id === usuario.sucursal)
  ) || { descripcion: "" };
  const classes = useStyles();
  const history = useHistory();
  const navegarA = (ruta) => {
    history.push(`${ruta}`);
  };
  useEffect(() => {
    dispatch(fetchSucursales());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        open={openDrawer}
        variant="temporary"
        onBackdropClick={closeDrawer}
      >
        <Box boxShadow={3} paddingLeft="5px">
          <List key="lista1">
            <ListItem key="TituloUsuario">
              <ListItemText>
                <Typography variant="h5">Usuario</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText
                primary={usuario.nombres + " " + usuario.apellidos}
                disableTypography
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary={usuario.email} disableTypography />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={descripcion} disableTypography />
            </ListItem>
          </List>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <MenuOpen color="primary" />
            </ListItemIcon>
            <ListItemText primary="Menú" />
          </ListItem>
          <Divider variant="fullWidth" />
          {routes.map((pagina, index) => (
            <OpcionDesplegable
              key={index}
              pagina={pagina}
              navegarA={navegarA}
            />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MenuIzquierdo;
