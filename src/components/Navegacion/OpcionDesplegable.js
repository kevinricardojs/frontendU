import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Collapse,
  Divider,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

export const OpcionDesplegable = ({ pagina, navegarA }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon color="primary">{pagina.materialIcon}</Icon>
        </ListItemIcon>
        <ListItemText primary={pagina.descripcion} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {pagina.rutas.map((ruta, index) => (
          <List component="div" disablePadding key={index}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navegarA(ruta.url)}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={ruta.descripcion} />
            </ListItemButton>
            <Divider variant="inset" light />
          </List>
        ))}
      </Collapse>
    </>
  );
};
