import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function InfoModal({ open, handleClose }) {
    return (<Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        handleClose={handleClose}
        style={style}
    >
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Type in text in text box and press enter or speak button.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
    </Modal>)
}

export default InfoModal
