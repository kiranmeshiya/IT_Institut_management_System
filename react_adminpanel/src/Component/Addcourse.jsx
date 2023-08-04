import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
// ===================== Successbox files ================== 
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import success2 from '../Component/image/7efs1.gif'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Dashboard from './Dashboard';
function Addcourse() {

    const [course, setCourse] = useState("");
    const [ermessage, setErmessage] = useState('');
    const token = localStorage.getItem('token')

    const handleSubmit = () => {
        axios.post('http://localhost:5000/course/addcourse', {
            coursename: course
        }, {
            headers: {
                'Authorization': token
            }
        })
            .then(function (response) {
                console.log(response.data)
                if (response.data.status === 'Course Add Successfully') {
                    setCourse("");
                    handleClickOpen();
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    setErmessage(error.response.data.error);
                    setOpen1(true);
                    setTimeout(() => {
                        setOpen1(false)
                    }, 5000);
                } else {
                    console.log(error);
                }
            });
    }
    // =============== Successbox setup start ==================
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location = '/addcourse'
    };
    // =============== Successbox setup End ==================

    return (
        <div >
            <Dashboard />
            <Container className='responsive'>
                <Box sx={{ paddingTop: 10 }}>
                    <Grid container>
                        <Grid item xs={12} md={8} component={Paper}
                            elevation={10}
                            square margin='auto' sx={{ borderRadius: "10px", padding: "20px 30px" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                                <Typography variant="h4" sx={{ mt: 1, mb: 2, fontWeight: 'bold' }}> Add Course</Typography>
                                {/* ========================== alert Box================== */}
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Collapse in={open1}>
                                        <Alert severity="error">
                                            {ermessage}
                                        </Alert>
                                    </Collapse>
                                </Stack>
                                {/* ======================alert box end ======================== */}
                                <Box sx={{ display: 'flex', mt: 2 }}>
                                    <Box component="form" xs={{ mt: 5 }} >
                                        <Grid item xs={12} md={12}>
                                            <TextField
                                                placeholder='Enter new Course here'
                                                margin="normal"
                                                autoComplete="Course"
                                                required
                                                id='course'
                                                label="course"
                                                name="course"
                                                value={course}
                                                autoFocus
                                                onChange={(e) => setCourse(e.target.value)}
                                                sx={{ marginRight: '20px', width: '100%' }}
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12} sx={{ textAlign: { xs: 'center', md: 'center' }, marginTop: { sm: '20px!important' } }} >

                                            <Button variant="contained" type="button" margin="normal" onClick={handleSubmit} sx={{ mt: 2, mb: 2, padding: '15px 25px' }} style={{ margin: 'auto!important' }} >Add</Button>
                                        </Grid>
                                    </Box>

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>


            {/* ========================== Success Box ==================== */}
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    sx={{ textAlign: 'center' }}
                >
                    <Box sx={{ padding: '0 40px 20px 40px!important' }}>
                        <DialogTitle sx={{ paddingBottom: '0!important', marginBottom: '0!important' }}> <img src={success2} alt="Success" width='200px' height='80px' /></DialogTitle>
                        <DialogTitle sx={{ fontSize: '30px', color: 'green', fontWeight: 'bold', paddingTop: '0!important' }}>Congratutions!</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Your Course is Successfully Saved!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions >
                            <Button variant="contained" color="success" onClick={handleClose} sx={{ margin: 'auto', textAlign: 'center' }} >Ok</Button>

                        </DialogActions>
                    </Box>
                </Dialog>
            </div>



        </div>
    )
}

export default Addcourse
