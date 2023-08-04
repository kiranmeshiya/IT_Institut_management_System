import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#343A40!important',
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,

    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Viewstudent() {
    const navigate = useNavigate()
    function createData(installmentDetails) {
        return { installment_details: installmentDetails, };
    }
    const token = localStorage.getItem('token')
    const [val, setVal] = useState([]);
    const [remaining_fees, setRemainingFees] = useState(0);
    const [installment, setInstallment] = React.useState([]);
    const [ermessage, setErmessage] = useState('');
    const [coursename,setCoursename] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [rows, setRows] = React.useState([])
    const param = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/course/viewstudentDetail/${param.id}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(function (response) {
                console.log(response.data);
                const data = response.data.data;
                const studentData = response.data.data.installment_details;
                const installment_data = response.data.remaining_fees;
                setCoursename(response.data.coursename)
                setInstallment(installment_data);
                setVal(data);
                const remainingfee = installment_data.reduce((total, item) => total + parseInt(item.amount), 0);
                setRemainingFees(remainingfee);

                const formattedRows = studentData.map((item) => ({
                    amount: item.amount,
                    installment_date: item.installment_date,
                    p_status: item.p_status,

                }));
                setRows(formattedRows);
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
    }, [param.id, token])
    return (
        <div>
            <Dashboard />
            <Container className='responsive'>
                <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mt: 1, mb: 4, ml: 'auto', fontWeight: 'bold' }}> Student Profile</Typography>
                </Grid>
                <Grid item xs={12} md={12} component={Paper} elevation={10} square margin='auto' sx={{ borderRadius: "10px", padding:"10px 30px", paddingLeft:'50px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3} sx={{ marginBottom: '0!important', paddingTop: '20px!important', textAlign: 'center' }}>
                                <Avatar
                                // variant="rounded"
                                    alt=""
                                    src="image/profile_pic.png"
                                    sx={{ width: 170, height: 170 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '60px!important', textAlign: 'left' }}>
                                <Typography sx={{fontSize:'20px', color:"red", fontWeight:'bold'}}>{val.surname + " " + val.studentname + " " + val.fathername}</Typography>
                                <Typography sx={{fontSize:'16px', color:"black", fontWeight:'bold'}}>{coursename}</Typography>
                                <Typography sx={{fontSize:'16px', color:"black", fontWeight:'bold'}}>{val.batch_time}</Typography>

                            </Grid>
                        </Grid>

                        {/* ==================== Details ====================== */}

                        <Grid container spacing={3}>
                            {/* ===================== personal info ==================== */}
                            <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 'auto', mr: 'auto', fontWeight: 'bold', color: 'red' }}> Personal Information</Typography>
                            <Grid item xs={12} md={12} className='detail_area' sx={{ marginBottom: '10px!important', paddingTop: '20px!important', paddingBottom: '20px!important' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Student Contact No:</Typography><Typography variant="body2">{val.stu_contact_no}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Student Whatsapp No:</Typography><Typography variant="body2">{val.stu_whatsapp_no}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Parents Contact No:</Typography><Typography variant="body2">{val.parent_contact_no}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Parents Whatsapp no:</Typography><Typography variant="body2">{val.parent_whatsapp_no}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Address:</Typography><Typography variant="body2">{val.address}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Birthdate:</Typography><Typography variant="body2">{val.dob}</Typography></Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Qualification:</Typography><Typography variant="body2">{val.qualification}</Typography></Box>
                                    </Grid>
                                </Grid>

                            </Grid>
                            {/* =================== course info ================= */}
                            <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 'auto', mr: 'auto', fontWeight: 'bold', color: 'red' }}> Course Information</Typography>
                            <Grid item xs={12} md={12} className='detail_area' sx={{ marginBottom: '10px!important', paddingTop: '20px!important', paddingBottom: '20px!important' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2"  sx={{width: ['90px', '120px', '180px'],  fontWeight: 'bold', fontSize: '15px' }}>Course Name:</Typography><Typography variant="body2">{coursename}</Typography></Box>
                                    </Grid>                                                         
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{  width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Course Content:</Typography><Typography variant="body2">{val.course_content ? val.course_content.slice(0,5):""}...</Typography></Box>
                                    </Grid>                                                                                                                                                                                                     
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Course Duration:</Typography><Typography variant="body2">{val.course_duration}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Reference:</Typography><Typography variant="body2">{val.reference}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Daily Time:</Typography><Typography variant="body2">{val.daily_time}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Batch Time:</Typography><Typography variant="body2">{val.batch_time}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Collage Course:</Typography><Typography variant="body2">{val.college_course}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>GST:</Typography><Typography variant="body2">{val.gst}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Total Fees:</Typography><Typography variant="body2">{val.total_fees}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Remaining Fees:</Typography><Typography variant="body2">{remaining_fees}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Extra Note:</Typography><Typography variant="body2">{val.extra_note}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Reception Note:</Typography><Typography variant="body2">{val.reception_note}</Typography></Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* ================ Installment Info =================== */}
                            <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 'auto', mr: 'auto', fontWeight: 'bold', color: 'red' }}> Installment Details</Typography>
                            <Grid item xs={12} md={12} className='detail_area' sx={{ marginBottom: '10px!important', paddingTop: '20px!important', paddingBottom: '20px!important' }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={12} sx={{ margin: 'auto', paddingRight: '16px' }}>

                                        <TableContainer component={Paper} >

                                            <Table aria-label="customized table">
                                                <TableHead >
                                                    <TableRow sx={{ textAlign: 'center' }}>
                                                        <StyledTableCell sx={{ fontSize: '17px' }}>No.</StyledTableCell>
                                                        <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Amount</StyledTableCell>
                                                        <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Installment Date</StyledTableCell>
                                                        <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Payment Status</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.length > 0 &&
                                                        rows.map((row, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                                                                    {index + 1}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.amount}</StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.installment_date}</StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ fontSize: '16px' }} style={row.p_status === '0' ? { color: 'red', fontWeight: 'bold' } : { color: 'green', fontWeight: 'bold' }}>{row.p_status == '0' ? 'UNPAID' : 'PAID'}</StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                </TableBody>

                                            </Table>

                                        </TableContainer>

                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* =================== Faculty info ================= */}
                            <Typography variant="h6" sx={{ mt: 1, mb: 1, ml: 'auto', mr: 'auto', fontWeight: 'bold', color: 'red' }}> Faculty Information</Typography>
                            <Grid item xs={12} md={12} className='detail_area' sx={{ marginBottom: '10px!important', paddingTop: '20px!important', paddingBottom: '20px!important' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Device:</Typography><Typography variant="body2">{val.pc_laptop}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Leptop Compulsory:</Typography><Typography variant="body2">{val.laptop_compulsory}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>PC Number:</Typography><Typography variant="body2">{val.pc_no == "" ? " - " : val.pc_no}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Running Topic:</Typography><Typography variant="body2">{val.running_topic}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Faculty:</Typography><Typography variant="body2">{val.faculty}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Job Responsbility:</Typography><Typography variant="body2">{val.job_responsbility}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Date Of Joining:</Typography><Typography variant="body2">{val.joining_date}</Typography></Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex' }}><Typography variant="body2" sx={{ width: ['90px', '120px', '180px'], fontWeight: 'bold', fontSize: '15px' }}>Date Of Ending:</Typography><Typography variant="body2">{val.ending_date}</Typography></Box>
                                    </Grid>
                                   
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}  sx={{ marginBottom: '10px!important', paddingTop: '20px!important', paddingBottom: '20px!important' , textAlign:'center'}}>
                            <Button variant="contained" color="error" onClick={() => navigate(`/updatestudentDetails/${val._id}`)}>Update</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </div>
    )
}

export default Viewstudent
