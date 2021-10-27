import Dashboard from "./Dashboard";
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {

  const colorMode = React.useContext(ColorModeContext);

  const [mode, setMode] = React.useState('dark');

  const theme = React.useMemo(
      () =>
          createTheme({
            palette: {
              mode,
            },
          }),
      [mode],
  );

  return (<ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Dashboard/>
          </ThemeProvider>
      </ColorModeContext.Provider>);
}

export default App;
