import React from 'react'
import {Button, Card, CardContent, TextareaAutosize} from "@mui/material";

function SpeakCard({ voice }) {

    const [ message, setMessage ] = React.useState('')

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(message)
        utterance.voice = voice
        speechSynthesis.speak(utterance)
    }

    return (<Card>
        <CardContent>
            <TextareaAutosize
                minRows={10}
                onChange={(e) => setMessage(() => e.target.value)}
                style={{ width: 600 }}
            />
            <Button
                onClick={() => speak()}
            >Speak</Button>
        </CardContent>
    </Card>)
}

export default SpeakCard
