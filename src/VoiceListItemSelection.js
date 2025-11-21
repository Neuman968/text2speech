import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Avatar} from "@mui/material";
import {RandomAvatar} from "./RandomAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FlagIcon from "./FlagIcon";
import {computeHexSeed} from "./Dashboard";

const VoiceListItemSelection = React.memo(({ voice, onSelectedVoiceChange }) => {
    const hexSeed = React.useMemo(() => computeHexSeed(voice.name), [voice.name])
    
    const handleClick = React.useCallback(() => {
        onSelectedVoiceChange(voice)
    }, [voice, onSelectedVoiceChange])
    
    return (<ListItem onClick={handleClick}>
        <ListItemIcon>
            <Avatar>
                <RandomAvatar seed={hexSeed}/>
            </Avatar>
        </ListItemIcon>
        <ListItemText
            primary={voice.name}
            secondary={voice.lang}
        />
        <ListItemAvatar>
            <FlagIcon lang={voice.lang}/>
        </ListItemAvatar>
    </ListItem>)
})

export default VoiceListItemSelection
