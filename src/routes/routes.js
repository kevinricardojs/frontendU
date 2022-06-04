import { Empresa, Sucursal, SocioNegocio } from "../pages/Configuraciones";
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
];
