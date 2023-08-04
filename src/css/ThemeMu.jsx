import { createTheme } from "@mui/material/styles";

// Define tu paleta personalizada
const theme = createTheme({
  palette: {
    primary: {
      main: "#5D5FEF", // Color principal
    },
    secondary: {
      main: "#03a9f4", // Color secundario
    },
  },
  backgroundTS: "#fff",
  principalFontColor: "#635F85",
  whiteFontColor: "#fff",
});
export default theme;
