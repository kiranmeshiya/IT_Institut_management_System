import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import { Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function createData(surname,
  studentname,
  fathername,
  stu_contact_no,
  stu_whatsapp_no,
  parent_contact_no,
  parent_whatsapp_no,
  address,
  dob,
  image,
  qualification,
  reference,
  course,
  course_duration,
  daily_time,
  course_content,
  total_fees,
  joining_date,
  ending_date,
  job_responsbility,
  college_course,
  faculty,
  batch_time,
  running_topic,
  pc_laptop,
  pc_no,
  laptop_compulsory,
  gst,
  extra_note,
  reception_note,
  update,
  deletes,
  installmentDetails
) {
  return {
    surname,
    studentname,
    fathername,
    stu_contact_no,
    stu_whatsapp_no,
    parent_contact_no,
    parent_whatsapp_no,
    address,
    dob,
    image,
    qualification,
    reference,
    course,
    course_duration,
    daily_time,
    course_content,
    total_fees,
    joining_date,
    ending_date,
    job_responsbility,
    college_course,
    faculty,
    batch_time,
    running_topic,
    pc_laptop,
    pc_no,
    laptop_compulsory,
    gst,
    extra_note,
    reception_note,
    update,
    deletes,
    installment_details: installmentDetails,
  };
}

function Row(props) {
  const { row, handleDelete, index } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.surname}</TableCell>
        <TableCell >{row.studentname}</TableCell>
        <TableCell >{row.fathername}</TableCell>
        <TableCell >{row.stu_contact_no}</TableCell>
        <TableCell >{row.stu_whatsapp_no}</TableCell>
        <TableCell >{row.parent_contact_no}</TableCell>
        <TableCell >{row.parent_whatsapp_no}</TableCell>
        <TableCell >{row.address}</TableCell>
        <TableCell >{row.dob}</TableCell>
        <TableCell >{row.image}</TableCell>
        <TableCell >{row.qualification}</TableCell>
        <TableCell >{row.reference}</TableCell>
        <TableCell >{row.course}</TableCell>
        <TableCell >{row.course_content}</TableCell>
        <TableCell >{row.course_duration}</TableCell>
        <TableCell >{row.daily_time}</TableCell>
        <TableCell >{row.total_fees}</TableCell>
        <TableCell >{row.joining_date}</TableCell>
        <TableCell >{row.ending_date}</TableCell>
        <TableCell >{row.job_responsbility}</TableCell>
        <TableCell >{row.college_course}</TableCell>
        <TableCell >{row.faculty}</TableCell>
        <TableCell >{row.batch_time}</TableCell>
        <TableCell >{row.running_topic}</TableCell>
        <TableCell >{row.pc_laptop}</TableCell>
        <TableCell >{row.pc_no}</TableCell>
        <TableCell >{row.laptop_compulsory}</TableCell>
        <TableCell >{row.gst}</TableCell>
        <TableCell >{row.extra_note}</TableCell>
        <TableCell >{row.reception_note}</TableCell>
        <TableCell align="center" sx={{ color: 'green', fontWeight: "bold", textDecoration: "underline" }}><Link to={`/updatestudentDetails/${row.update}`} style={{ cursor: 'pointer', fontSize: '30px!important' }}><TaskAltIcon /></Link></TableCell>
        <TableCell align="center" sx={{ color: 'red', fontWeight: "bold", textDecoration: "underline" }}><a onClick={() => handleDelete(row.deletes)} style={{ cursor: 'pointer', fontSize: '22px!important',color:'red',border:'none' }}><DeleteForeverIcon /></a></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Fees Installments List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >No.</TableCell>
                    <TableCell >Amount</TableCell>
                    <TableCell >installment Date</TableCell>
                    <TableCell >Payment Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.installment_details.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell >{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.amount}
                      </TableCell>
                      <TableCell >{historyRow.installment_date}</TableCell>
                      <TableCell style={historyRow.p_status === '0' ? { color: 'red', fontWeight: 'bold' } : { color: 'green', fontWeight: 'bold' }}>{historyRow.p_status == '0' ? 'UNPAID' : 'PAID'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
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


  React.useEffect(() => {
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

            <Grid item xs={12} md={8}  sx={{ margin: 'auto', textAlign:'right' }}>
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
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} />
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">No.</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Surname</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Student name</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Father Name</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Stu_contact_no</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">stu_whatsapp_no</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">parent_contact_no</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">parent_whatsapp_no</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Address</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">DOB</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Image</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Qualification</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Reference</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Course</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Course content</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Course duration</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Daily time</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Total fees</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Joining date</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Ending Date</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">job_responsbility</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">college_course</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">faculty</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">batch_time</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">running_topic</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">pc_laptop</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">pc_no</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">laptop_compulsory</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">gst</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">extra_note</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">reception_note</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Update</TableCell>
                      <TableCell style={{ fontSize: '17px', backgroundColor: '#343A40', color: 'white' }} align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <Row key={row._id} row={row} index={index} handleDelete={handleDelete} />
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
