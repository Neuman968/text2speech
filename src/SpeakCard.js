import React, {useCallback} from 'react'
import {Button, Card, CardContent, TextareaAutosize} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

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
    fontSize: '16px',
    backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#fff',
    color: theme.palette.mode === 'dark' ? 'white' : 'black'
}))

function SpeakCard({ voice }) {

    const [message, setMessage] = React.useState('')

    const speak = useCallback((text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = voice
        speechSynthesis.speak(utterance)
    }, [voice])

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

    const textAreaOnChanged = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
    }
    return (<Card>
        <CardContent>
            <Box display="flex" flexDirection={'column'}>
                <TextArea
                    minRows={10}
                    onChange={textAreaOnChanged}
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
