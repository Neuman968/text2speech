import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import SpeakCard from "./SpeakCard";
import {Card, CardContent, CardHeader, useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {RandomAvatar} from "./RandomAvatar";
import InfoIcon from '@mui/icons-material/Info';
import InfoModal from "./InfoModal";
import VoiceListItemSelection from "./VoiceListItemSelection";

const drawerWidth = 240;

const avaiableVoices = speechSynthesis.getVoices()

export const computeHexSeed = (voiceName) => (`${new Buffer(voiceName).toString()}-${Date.now()}`).toString('hex')

function Dashboard({ toggleThemeMode, themeMode }) {

    const [open, setOpen] = React.useState(false);

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const [ infoOpen, setInfoOpen ] = React.useState(false)

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [selectedVoice, setSelectedVoice] = React.useState(avaiableVoices[0])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <MuiAppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{
                            paddingLeft: drawerWidth
                        }}
                        sx={{ flexGrow: 1,}}
                    >
                        Text To Speech
                    </Typography>
                    <IconButton
                        color="inherit"
                        align="right"
                        fontSize="large"
                        aria-label="open drawer"
                        sx={{
                            marginLeft: '30',
                        }}
                        onClick={() => setInfoOpen(true)}
                    >
                        <InfoIcon/>
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
            <MuiDrawer
                open={open}
                variant={isMobile ? "temporary" : "permanent"}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                onClose={toggleDrawer}
            >
                <Divider/>
                <List>
                    {avaiableVoices.map((voice) => <>
                        <VoiceListItemSelection
                            voice={voice}
                            setSelectedVoice={setSelectedVoice}
                        />
                        <Divider/>
                    </>)}
                </List>
            </MuiDrawer>
            <Box
                component="main"
                align="center"
                justifyContent="center"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                }}
            >
                <Toolbar/>
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 4,
                        mb: 4,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Card>
                        <CardHeader
                            align="center"
                            avatar={
                                <RandomAvatar
                                    style={{
                                        height: '160px',
                                        width: '160px',
                                        justifyContent: 'center',
                                    }}
                                    seed={computeHexSeed(selectedVoice.name)}
                                />
                            }
                        />
                        <CardContent>
                            <Typography align="center">
                                Speaking as {selectedVoice.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 4,
                        mb: 4,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <SpeakCard
                        voice={selectedVoice}
                        isMobile={isMobile}
                    />
                </Container>
            </Box>
            <InfoModal
                open={infoOpen}
                handleClose={() => setInfoOpen(false)}
                toggleThemeMode={toggleThemeMode}
                themeMode={themeMode}
            />
        </Box>
    );
}

export default Dashboard
