import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import logoLight from "../../images/logo-light.png";
import logoDark from "../../images/logo-dark.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const AppHeader = () => {
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const [activeTheme, setTheme] = useThemeSwitcher();

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.backgroundTS,
          color: theme.principalFontColor,
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Link to="/">
            {activeTheme === "dark" ? (
              <img
                src={logoDark}
                style={{ width: "60px", marginTop: "10px" }}
                alt="Dark Logo"
              />
            ) : (
              <img
                src={logoLight}
                style={{ width: "60px", marginTop: "10px" }}
                alt="Dark Logo"
              />
            )}
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "70px", fontWeight: "600" }}
          >
            <Link to="/">TRABAJADORES</Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "600" }}
          >
            <Link to="/form">¿TENES TRABAJADORES QUE RECOMENDAR?</Link>
          </Typography>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.whiteFontColor,
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <Link
              to="/login"
              sx={{
                fontWeight: "600",
              }}
            >
              LOGIN
            </Link>
          </div>
          <div className="hidden sm:flex justify-between items-center flex-col md:flex-row">
            <div
              onClick={() => setTheme(activeTheme)}
              aria-label="Theme Switcher"
              className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
            >
              {activeTheme === "dark" ? (
                <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
              ) : (
                <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
