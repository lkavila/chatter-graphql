import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import CustomizedSnackbar from "./components/snackbar/Snackbar";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
        <CustomizedSnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
