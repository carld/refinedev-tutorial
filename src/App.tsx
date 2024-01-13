
import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  RefineSnackbarProvider,
  notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider("http://localhost:9000")}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "users",
                list: "/users",
                show: "/users/show/:id",
//                create: "/users/create",
//                edit: "/users/edit/:id",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<NavigateToResource resource="users" />} />
                <Route path="users">
                  <Route index element={<MuiInferencer />} />
                  <Route path="show/:id" element={<MuiInferencer />} />
//                  <Route path="edit/:id" element={<MuiInferencer />} />
//                  <Route path="create" element={<MuiInferencer />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;