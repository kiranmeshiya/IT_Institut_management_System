import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
// ===================== Successbox files ================== 
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import success2 from '../Component/image/7efs.gif'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Dashboard from './Dashboard';
function Addcontent() {
    const [courses, setCourses] = useState([]);
    const [content, setContent] = useState("");
    const [selectedcourse, setSelectedcourse] = useState(""); 
    const [fees,setFees] = useState(0); 
    const [duration, setDuration] = useState("");
    const [ermessage, setErmessage] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const token = localStorage.getItem('token')
    // const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/course/allcourse', {
            headers: {
                'Authorization': token
            }
        })
            .then(function (response) {
                console.log(response.data)
                const data = response.data.data1;
                setCourses(data);
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
    }, [token])

    const handleSubmit = () => {
        axios.post('http://localhost:5000/course/addcontent', {
            course_id: selectedcourse,
            content: content,
            duration: duration,
            total_fees: fees
        }, {
            headers: {
                'Authorization': token
            }
        })
            .then(function (response) {
                console.log(response.data)
                if (response.data.status === 'Content Add Successfully') {
                    setSelectedcourse("");
                    setContent("");
                    setDuration("");
                    setFees(0);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location = '/addcontent'
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };
    // =============== Successbox setup End ==================
    return (
        <div>
            <Dashboard />
            <Container className='responsive'>
                <Box sx={{ paddingTop: 2 }}>
                    <Grid container >
                        <Grid item xs={12} md={6} component={Paper}
                            elevation={10}
                            square margin='auto' sx={{ borderRadius: "10px", padding: "20px 30px" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                                <Typography variant="h4" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}> Add Content</Typography>
                                {/* ========================== alert Box================== */}
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Collapse in={open1}>
                                        <Alert severity="error">
                                            {ermessage}
                                        </Alert>
                                    </Collapse>
                                </Stack>
                                {/* ======================alert box end ======================== */}
                                <Box sx={{ display: 'flex' }}>
                                    <Box component="form" xs={{ mt: 5 }} >
                                        <Grid item xs={10} md={12}  sx={{ margin: 'auto' }}>
                                            <FormControl sx={{ minWidth:{xs:184, md:260} }} >
                                                <InputLabel id="demo-multiple-name-label">Course</InputLabel>
                                                <Select
                                                    labelId="Course Name"
                                                    id="demo-multiple-name"
                                                    value={selectedcourse}
                                                    onChange={(e) => setSelectedcourse(e.target.value)}
                                                    input={<OutlinedInput label="Course" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {courses.length > 0 &&
                                                        courses.map((item, index) => (
                                                            <MenuItem key={index} value={item._id}>
                                                                {item.coursename}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={10} md={12}  sx={{ margin: 'auto' }}>
                                            <TextField
                                                placeholder='Enter Content here'
                                                margin="normal"
                                                autoComplete="content"
                                                required
                                                id='content'
                                                label="content"
                                                name="content"
                                                value={content}
                                                autoFocus
                                                onChange={(e) => setContent(e.target.value)}
                                                sx={{ marginRight: '20px', width: '100%' }}
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={10} md={12} sx={{ margin: 'auto' }}>

                                            <TextField
                                                placeholder='Enter Course Duration here'
                                                margin="normal"
                                                autoComplete="duration"
                                                required
                                                id='duration'
                                                label="Duration"
                                                name="duration"
                                                value={duration}
                                                autoFocus
                                                onChange={(e) => setDuration(e.target.value)}
                                                sx={{ marginRight: '20px', width: '100%' }}
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={10} md={12} sx={{ margin: 'auto' }}>

                                            <TextField
                                                placeholder='Enter Course Duration here'
                                                margin="normal"
                                                autoComplete="Total Fees"
                                                required
                                                id='total_fees'
                                                label="Total Fees"
                                                name="total_fees"
                                                value={fees}
                                                autoFocus
                                                onChange={(e) => setFees(e.target.value)}
                                                sx={{ marginRight: '20px', width: '100%' }}
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12} sx={{ margin: 'auto', textAlign: "center" }}>
                                            <Button variant="contained" type="button" margin="normal" onClick={handleSubmit} sx={{ mt: 2, mb: 2, padding: '15px 25px' }}>Add Content</Button>
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
                    disableEnforceFocus
                    sx={{ textAlign: 'center' }}
                >
                    <Box sx={{ padding: '0 40px 20px 40px!important' }}>
                        <DialogTitle sx={{ paddingBottom: '0!important', marginBottom: '0!important' }}> <img src={success2} alt="Success" width='200px' height='150px' /></DialogTitle>
                        <DialogTitle sx={{ fontSize: '30px', color: 'green', fontWeight: 'bold', paddingTop: '0!important' }}>Congratutions!</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Your Content is Successfully Saved!
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

export default Addcontent
