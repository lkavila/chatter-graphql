import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import client from "./constants/apollo-client";

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
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
