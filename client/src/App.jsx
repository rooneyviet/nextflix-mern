import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.config";
import {ToastContainer} from "react-toastify"

const App = () => {
  const {themeMode} = useSelector((state)=> state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({mode: themeMode})}>
        <ToastContainer 
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          theme={themeMode}

          />

        <CssBaseline/>
    </ThemeProvider>
  );
}

export default App;
