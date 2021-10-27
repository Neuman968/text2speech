import React from 'react'
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DialogContent} from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function InfoModal({ open, handleClose }) {
    return (<Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <DialogTitle>
            About
        </DialogTitle>
        <DialogContent>
            <Typography id="modal-modal-title" variant="p" component="h5">
                Type in text in text box and press enter or speak button.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>Close</Button>
        </DialogActions>
        {/*<Box>*/}
        {/*    <Typography id="modal-modal-title" variant="h6" component="h2">*/}
        {/*        Type in text in text box and press enter or speak button.*/}
        {/*    </Typography>*/}
        {/*    <Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
        {/*        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
        {/*    </Typography>*/}
        {/*</Box>*/}
    </Dialog>)
}

export default InfoModal
