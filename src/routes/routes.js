import { Compra } from "../pages/Compra";
import { CompraList } from "../pages/CompraList";
import { Empresa, Sucursal, SocioNegocio } from "../pages/Configuraciones";
import { ListaMaterial } from "../pages/ListaMaterial";
import { ListaMaterialList } from "../pages/ListaMaterialList";
import { Cuenta } from "../pages/Presupuesto";
import { Produccion } from "../pages/Produccion";
import { FamiliaProducto, TipoProducto, Producto } from "../pages/Productos";
import { Salida } from "../pages/Salida";
import { Venta } from "../pages/Venta";
import { VentaList } from "../pages/VentaList";
export const routes = [
  {
    descripcion: "Configuraciones",
    materialIcon: "settings",
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
    materialIcon: "shopping_bag",
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
    materialIcon: "account_balance_wallet",
    rutas: [
      {
        descripcion: "Cuentas Contables",
        url: "/Cuenta",
        componente: Cuenta,
      },
    ],
  },
  {
    descripcion: "Compra",
    materialIcon: "shopping_cart",
    rutas: [
      {
        descripcion: "Registrar Compra",
        url: "/Compra",
        componente: Compra,
      },
      {
        descripcion: "Compras Realizadas",
        url: "/Compras",
        componente: CompraList,
      },
    ],
  },
  {
    descripcion: "Venta",
    materialIcon: "shopping_cart_checkout",
    rutas: [
      {
        descripcion: "Registrar Venta",
        url: "/Venta",
        componente: Venta,
      },
      {
        descripcion: "Ventas Realizadas",
        url: "/Ventas",
        componente: VentaList,
      },
    ],
  },
  {
    descripcion: "Lista de Materiales",
    materialIcon: "list",
    rutas: [
      {
        descripcion: "Crear Lista de Materiales",
        url: "/ListaMaterial",
        componente: ListaMaterial,
      },
      {
        descripcion: "Lista de Materiales Realizadas",
        url: "/ListaMaterials",
        componente: ListaMaterialList,
      },
    ],
  },
  {
    descripcion: "Producción",
    materialIcon: "engineering",
    rutas: [
      {
        descripcion: "Producir",
        url: "/Produccion",
        componente: Produccion,
      },
    ],
  },
  {
    descripcion: "Salidas",
    materialIcon: "receipt",
    rutas: [
      {
        descripcion: "Salida",
        url: "/Salida",
        componente: Salida,
      },
    ],
  },
];
