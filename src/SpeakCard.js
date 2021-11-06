import React from 'react'
import {Button, Card, CardContent, TextareaAutosize} from "@mui/material";
import Box from "@mui/material/Box";
import { styled, useTheme } from '@mui/material/styles';

const TextArea = styled(TextareaAutosize, {})(({ theme }) => ({
    [theme.breakpoints.only('sm')]: {
        width: 200,
    },
    [theme.breakpoints.up('sm')]: {
        width: 400,
    },
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
    backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#fff',
    color: theme.palette.mode === 'dark' ? 'white' : 'black'
}))

function SpeakCard({ voice, isMobile }) {

    const theme = useTheme()

    const [message, setMessage] = React.useState('')

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = voice
        speechSynthesis.speak(utterance)
    }

    // Speak on Enter press.
    React.useEffect(() => {
        const eventListener = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                speak(message)
            }
        }
        window.addEventListener('keydown', eventListener);
        return () => window.removeEventListener('keydown', eventListener)
    }, [message, voice, speak]);

    return (<Card>
        <CardContent>
            <Box display="flex" flexDirection={'column'}>
                <TextArea
                    minRows={10}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => speak(message)}
                >Speak</Button>
            </Box>
        </CardContent>
    </Card>)
}

export default SpeakCard
