import React from 'react'
import {Avatar, Icon} from "@mui/material";

const reqSvgs = require.context ( './flags', true, /\.svg$/ )
const flagSvgs = reqSvgs.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    images[key] = reqSvgs(path).default
    return images
}, {})

const FlagIcon = React.memo(({ lang }) => {
    const parsedLang = React.useMemo(() => 
        lang ? lang.split('-')[1].substr(0, 2) : 'US',
        [lang]
    )
    
    return <Avatar>
        <Icon>
            <img alt={`${parsedLang} icon`} src={flagSvgs[parsedLang] || flagSvgs['US']}/>
        </Icon>
    </Avatar>
})

export default FlagIcon
