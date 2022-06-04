import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(
  adaptV4Theme({
    palette: {
      mode: "light",
      primary: {
        main: "#024C89",
      },
      secondary: {
        main: "#EC3028",
      },
      success: {
        main: "#00695c",
      },
      error: {
        main: "#b71c1c",
      },
    },
    typography: {
      h1: {
        fontSize: "4em",
      },
      h2: {
        fontSize: "3.5em",
      },
      h3: {
        fontSize: "2.5em",
      },
      h4: {
        fontSize: "2em",
      },
      h5: {
        fontSize: "1.5em",
      },
      body2: {
        fontSize: 11,
      },
    },
  })
);

export default theme;
