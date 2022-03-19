import Dashboard from "./Dashboard";
import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {useEffect} from "react";

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {

    const colorMode = React.useContext(ColorModeContext);

    const [mode, setMode] = React.useState('light');

    const [availableVoices, setAvailableVoices] = React.useState(window.speechSynthesis.getVoices())

    useEffect(() => {
        if (availableVoices.length === 0) {
            setTimeout(() => setAvailableVoices(window.speechSynthesis.getVoices()), 500)
        }
    }, [ availableVoices.length ])

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
            <Dashboard
                themeMode={mode}
                toggleThemeMode={(themeMode) => setMode(themeMode)}
                availableVoices={{voices: availableVoices}}
            />
        </ThemeProvider>
    </ColorModeContext.Provider>);
}

export default App;
