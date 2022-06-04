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
import Icon from "@mui/material/Icon";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { routes } from "../../routes/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MenuIzquierdo = ({ openDrawer, closeDrawer }) => {

  const { usuario } = useSelector((state) => state.usuario);
  const classes = useStyles();
  const history = useHistory();
  const navegarA = (ruta) => {
    history.push(`${ruta}`);
  };

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
              <ListItemText primary={usuario.departamento} disableTypography />
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
          {routes.map((permiso, index) => (
            <div key={`div ${permiso.descripcion}`}>
              <ListItem button key={index}>
                <ListItemIcon>
                  <Icon color="primary">{permiso.materialIcon}</Icon>
                </ListItemIcon>
                <ListItemText primary={permiso.descripcion} />
              </ListItem>
              <Divider variant="fullWidth" />
              {permiso.rutas.map((pagina) => (
                <div key={`div ${pagina.descripcion}`}>
                  <ListItem button>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={pagina.descripcion}
                      onClick={() => navegarA(pagina.url)}
                    />
                  </ListItem>
                  <Divider variant="inset" light />
                </div>
              ))}
            </div>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MenuIzquierdo;
