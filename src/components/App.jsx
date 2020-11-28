import React from "react";
import RTL from "components/RTL"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { faIR } from '@material-ui/core/locale';
import Shabnam from "fonts/Shabnam.ttf"
import Main from "pages/Main"

const shabnam = {
  fontFamily: 'Shabnam',
  fontStyle: 'normal',
  src: `
    local('Shabnam'),
    local('Shabnam-Regular'),
    url(${Shabnam}) format('ttf')
  `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Shabnam , Arial"
  },
}, faIR);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  )
}
