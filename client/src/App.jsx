import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.config";
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper.jsx";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
          pauseOnFocusLoss
          pauseOnHover
          theme={themeMode}

          />

        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
                {routes.map((route, index) => (
                  route.index ? (
                    <Route 
                      index
                      key={index}
                      element={route.state ? (
                        <PageWrapper state={route.state}>
                              {route.element}
                        </PageWrapper>
                      ) : route.element}
                    />
                  ) : (
                    <Route 
                        path={route.path}
                        key={index}
                        element={route.state ? (
                          <PageWrapper state={route.state}>
                              {route.element}
                          </PageWrapper>
                        ) : route.element}
                        />
                  )
                ))}
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
