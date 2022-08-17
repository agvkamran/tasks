import { useSelector } from "react-redux";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BasicModal from "../modal/Modal";
import { selectTasks, selectStartedItems } from "../../redux/selectors";

const Tasks = () => {
    const tasks = useSelector(selectTasks);
    const startedItems = useSelector(selectStartedItems);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [task, setTask] = React.useState(null);

    const start = item => {
        setOpen("start");
        setTask(item);
    };

    const deleteTask = item => {
        setOpen("delete");
        setTask(item);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850, maxWidth: 850 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">TaskName</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.taskId}>
                                <TableCell sx={startedItems?.map(item => item.id).includes(task.taskId) ? { color: 'green' } : { color: 'blue' }} align="right">{task.taskName}</TableCell>
                                <TableCell align="right">{task.taskStatus}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => start(task)} variant="contained">Start</Button>
                                    <Button onClick={() => deleteTask(task)} variant="outlined">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && (
                <BasicModal item={task} open={open} handleOpen={handleOpen} handleClose={handleClose} />
            )}
        </div>
    )
}

export default Tasks;