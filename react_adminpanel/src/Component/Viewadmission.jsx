import React, { useEffect, useState } from 'react'
import { styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
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


function createData(surname, studentname, stu_contact_no, course, total_fees,view, update, deletes) {
  return {surname, studentname, stu_contact_no, course, total_fees,view, update, deletes};
}

function Viewadmission() {
  const token = localStorage.getItem('token')
  const [rows, setRows] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [installmentDetails, setInstallmentDetails] = useState([]);
  const [lastpage, setLastPage] = useState(1);
  const [start, setStart] = useState(1);
  const [open1, setOpen1] = useState(false)
  const [altmessage, setaltmessage] = useState({
    msg: "",
    type: ""
  })


useEffect(() => {
    viewData()
  }, [page])

  const viewData = () => {
    axios.get(`http://localhost:5000/course/allstudent_detail?page_no=${page}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data);
        setLastPage(response.data.lastpage);
        setStart(response.data.start)
        setPage(page);
        const students = response.data.data;
        const formattedRows = students.map((student,index) =>
          createData(
            student.surname,
            student.studentname,
            student.stu_contact_no,   
            student.course,
            student.total_fees,
            student._id, 
            student._id, 
            student._id,
        ));
        setRows(formattedRows);
      })
  }

  // ================== Pagination =========================
  const handleChange = (event, value) => {
    setPage(value);

  };

  const handleSearch = (e) => {
    console.log(e.target.value)
    axios.get(`http://localhost:5000/course/searchstudentdetails?page_no=${page}&search=${e.target.value}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data);
        setLastPage(response.data.lastpage);
        setStart(response.data.start)
        setPage(page);
        const students = response.data.data;

        const formattedRows = students.map((student) => {

          const installmentDetails = student.installment_details?.map((item) => ({
            amount: item.amount,
            installment_date: item.installment_date,
            p_status: item.p_status
          })) || [];

          // Create formattedRows data
          return createData(
            student.surname,
            student.studentname,
            student.fathername,
            student.stu_contact_no,
            student.stu_whatsapp_no,
            student.parent_contact_no,
            student.parent_whatsapp_no,
            student.address,
            student.dob,
            student.image,
            student.qualification,
            student.reference,
            student.course,
            student.course_duration,
            student.daily_time,
            student.course_content,
            student.total_fees,
            student.joining_date,
            student.ending_date,
            student.job_responsbility,
            student.college_course,
            student.faculty,
            student.batch_time,
            student.running_topic,
            student.pc_laptop,
            student.pc_no,
            student.laptop_compulsory,
            student.gst,
            student.extra_note,
            student.reception_note,
            student._id, // Use the _id as the key
            student._id,
            installmentDetails, // Pass installmentDetails array to createData

          );
        });

        // Set both state variables
        setRows(formattedRows);
        setInstallmentDetails(installmentDetails);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          alert('not can fetch data');
        } else {
          console.log(error);
        }
      });
  }

  const handleDelete = (s_id) => {
    axios.delete(`http://localhost:5000/course//deletestudentDetail/${s_id}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data)
        setaltmessage({ msg: "Data Delete Successfully", type: "success" })
        setOpen1(true)
        setTimeout(() => {
          setOpen1(false)
        }, 4000);
        setPage(page);
        viewData()
        // navigate('/dashboard/viewcourse')
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          setaltmessage({ msg: "Data not Delete Successfully", type: "error" })

        } else {
          console.log(error);
        }
      });
  }

  return (
    <>
      <Dashboard />
      <Container className='responsive'>
        {/* ========================== alert Box================== */}
        <Stack sx={{ width: '100%' }} spacing={2} >
          <Collapse in={open1}>
            <Alert severity={altmessage.type || "info"}>
              {altmessage.msg}
            </Alert>
          </Collapse>
        </Stack>
        {/* ======================alert box end ======================== */}
        <Grid container>

          <Grid item xs={12} md={8} sx={{ margin: 'auto', textAlign: 'right' }}>
            <FormControl sx={{ mb: 3, width: '25ch' }} variant="outlined" >
              <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />

                  </InputAdornment>
                }
                label="Search"
                onChange={handleSearch}
              />
            </FormControl>
          </Grid>

              
            <Grid item xs={12} md={12} component={Paper} sx={{ margin: 'auto' }}>
        
        <TableContainer component={Paper} > 
     
          <Table  aria-label="customized table">
            <TableHead >
              <TableRow sx={{ textAlign: 'center' }}>
                <StyledTableCell sx={{ fontSize: '17px' }}>No</StyledTableCell>
           
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Surname</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Student Name</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Contact No</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Course Name</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Total Fees</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>View</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Update</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.length > 0 &&
rows.map((row,index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                      {index + 1 + start}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.surname}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.studentname}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.stu_contact_no}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.course}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.total_fees}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: 'green', fontWeight: "bold", textDecoration: "underline" }}><Link to={`/viewstudent/${row.view}`} style={{ cursor: 'pointer', fontSize: '30px!important' }}><VisibilityIcon /></Link></StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: 'green', fontWeight: "bold", textDecoration: "underline" }}><Link to={`/updatestudentDetails/${row.update}`} style={{ cursor: 'pointer', fontSize: '30px!important' }}><TaskAltIcon /></Link></StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: 'red', fontWeight: "bold", textDecoration: "underline" }}><a onClick={() => handleDelete(row.deletes)} style={{ cursor: 'pointer', fontSize: '22px!important' }}><DeleteForeverIcon /></a></StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>

          </Table>

        </TableContainer>

      </Grid>

        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '20px' }}>
          <Stack direction="row" spacing={2} sx={{ paddingTop: '10px', textAlign: 'center' }}>
            <Pagination count={lastpage} variant="outlined" page={page}
              onChange={handleChange} />
          </Stack>
        </Box>
        {/* ================================== Pagenation ========================== */}

      </Container>

    </>
  )
}


export default Viewadmission
