import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Deposits from './Deposits';
import Orders from './Orders';
import AvatarComponent from "avataaars";
import {Avatar, Button, Card, CardContent, CardHeader, TextareaAutosize} from "@mui/material";
import {RandomAvatar} from "./RandomAvatar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'auto',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const avaiableVoices = speechSynthesis.getVoices()

  const [ selectedVoice, setSelectedVoice ] = React.useState(avaiableVoices[0])

  const [ message, setMessage ] = React.useState('')

  const speak = () => {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.voice = selectedVoice
      speechSynthesis.speak(utterance)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
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
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Text To Speech
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
            open={open}
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
          <Divider />
          <List>
            {avaiableVoices.map((voice) => <>
            <ListItem onClick={() => (setSelectedVoice(voice))}>
              <ListItemIcon>
               <Avatar>
                <RandomAvatar seed={new Buffer(voice.name).toString('hex')}/>
               </Avatar>
              </ListItemIcon>
              <ListItemText primary={voice.name}/>
            </ListItem>
              <Divider/>
            </>)}
          </List>
        </Drawer>
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
          <Toolbar />
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
                      seed={new Buffer(selectedVoice.name).toString('hex')}
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
                <Card>
                    <CardContent>
                        <TextareaAutosize
                            minRows={10}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ width: 600 }}
                        />
                        <Button
                            onClick={() => speak()}
                        >Speak</Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
