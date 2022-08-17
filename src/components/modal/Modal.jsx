import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import { startTaskAC, deleteTaskAC } from '../../redux/action';

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

export default function BasicModal(props) {
    const handleClose = () => props.handleClose(false);
    const dispatch = useDispatch();

    const setStartTask = (isStarted) => {
        if (isStarted) {
            dispatch(startTaskAC(props.item));
        }

        handleClose(true);
    };

    const setDeleteTask = (isStarted) => {
        if (isStarted) {
            dispatch(deleteTaskAC(props.item));
        }

        handleClose(true);
    }

    return (
        <div>
            <Modal
                open={props.open === "start" || props.open === "delete"}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure?
                    </Typography>
                    <Button onClick={() => (props.open === "start") ? setStartTask(true) : setDeleteTask(true)} variant="contained">Yes</Button>
                    <Button onClick={() => (props.open === "start") ? setStartTask(false) : setDeleteTask(false)} variant="outlined">No</Button>
                </Box>
            </Modal>
        </div>
    );
}