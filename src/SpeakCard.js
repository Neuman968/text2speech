import React from 'react'
import {Button, Card, CardContent, TextareaAutosize} from "@mui/material";
import Box from "@mui/material/Box";

function SpeakCard({ voice }) {

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
    }, [message, voice]);

    return (<Card>
        <CardContent>
            <Box display="flex" flexDirection={'column'}>
                <TextareaAutosize
                    minRows={10}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{width: 600}}
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
