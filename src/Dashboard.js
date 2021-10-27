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
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeakCard from "./SpeakCard";
import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import {RandomAvatar} from "./RandomAvatar";
import FlagIcon from "./FlagIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const drawerWidth = 240;

const avaiableVoices = speechSynthesis.getVoices()

const computeHexSeed = (voiceName) => (`${new Buffer(voiceName).toString()}-${Date.now()}`).toString('hex')

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [selectedVoice, setSelectedVoice] = React.useState(avaiableVoices[0])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <MuiAppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
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
                        sx={{flexGrow: 1}}
                    >
                        Text To Speech
                    </Typography>
                </Toolbar>
            </MuiAppBar>
            <MuiDrawer
                open={open}
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                <Divider/>
                <List>
                    {avaiableVoices.map((voice) => <>
                        <ListItem onClick={() => (setSelectedVoice(voice))}>
                            <ListItemIcon>
                                <Avatar>
                                    <RandomAvatar seed={computeHexSeed(voice.name)}/>
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={voice.name}
                                secondary={voice.lang}
                            />
                            <ListItemAvatar>
                                <FlagIcon lang={voice.lang}/>
                            </ListItemAvatar>
                        </ListItem>
                        <Divider/>
                    </>)}
                </List>
            </MuiDrawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    // overflow: 'auto',
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
                    <SpeakCard voice={selectedVoice}/>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}
