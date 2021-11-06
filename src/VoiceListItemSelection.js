import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Avatar} from "@mui/material";
import {RandomAvatar} from "./RandomAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FlagIcon from "./FlagIcon";
import {computeHexSeed} from "./Dashboard";

function VoiceListItemSelection({ voice, onSelectedVoiceChange }) {
    return (<ListItem onClick={() => (onSelectedVoiceChange(voice))}>
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
    </ListItem>)
}
export default VoiceListItemSelection
