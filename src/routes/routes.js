import { Empresa, Sucursal, SocioNegocio } from "../pages/Configuraciones";
import { Cuenta } from "../pages/Presupuesto";
import { FamiliaProducto, TipoProducto, Producto } from "../pages/Productos";
export const routes = [
  {
    descripcion: "Configuraciones",
    materialIcon: "config",
    rutas: [
      {
        descripcion: "Empresa",
        url: "/Empresa",
        componente: Empresa,
      },
      {
        descripcion: "Sucursal",
        url: "/Sucursal",
        componente: Sucursal,
      },
      {
        descripcion: "Socio de Negocios",
        url: "/SocioNegocio",
        componente: SocioNegocio,
      },
    ],
  },
  {
    descripcion: "Productos",
    materialIcon: "config",
    rutas: [
      {
        descripcion: "Familia de Productos",
        url: "/FamiliaProducto",
        componente: FamiliaProducto,
      },
      {
        descripcion: "Tipos de Producto",
        url: "/TipoProducto",
        componente: TipoProducto,
      },
      {
        descripcion: "Producto",
        url: "/Producto",
        componente: Producto,
      },
    ],
  },
  {
    descripcion: "Presupuesto",
    materialIcon: "config",
    rutas: [
      {
        descripcion: "Cuentas Contables",
        url: "/Cuenta",
        componente: Cuenta,
      },
    ],
  },
];
