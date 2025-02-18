import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#333",
    },
  },
});

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
