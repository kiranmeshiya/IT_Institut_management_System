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

function createData(coursename, update, deletes) {
  return { coursename, update, deletes };
}

function Viewcourse() {
  const token = localStorage.getItem('token')
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [lastpage, setLastPage] = useState(1);
  const [start, setStart] = useState(1);
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('');
  const [altmessage, setaltmessage] = useState({
    msg: "",
    type: ""
  })

  useEffect(() => {
    viewData()
  },[page])

  const viewData = () => {
    axios.get(`http://localhost:5000/course/allcourse?page_no=${page}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data);
        setLastPage(response.data.lastpage);
        setStart(response.data.start)
        setPage(page);
        const courses = response.data.data;
        const formattedRows = courses.map((course) =>
          createData(course.coursename, course._id, course._id)
        );
        setRows(formattedRows);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          alert('not can fetch data');
        } else {
          console.log(error);
        }
      });
  }
  const handleChange = (event, value) => {
     setPage(value);
 
  };

   
  const handleSearch = (e) => {
    console.log(e.target.value)
    axios.get(`http://localhost:5000/course/searchcourse?page_no=${page}&search=${e.target.value}`,{
      headers: {                      
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data);
        setLastPage(response.data.lastpage);
        setStart(response.data.start)
        setPage(page);
        const courses = response.data.data;
        const formattedRows = courses.map((course) =>
          createData(course.coursename, course._id, course._id)
        );
        setRows(formattedRows);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          alert('not can fetch data');
        } else {
          console.log(error);
        }
      });
  }
 

  const handleDelete = (course_id) => {
    axios.delete(`http://localhost:5000/course/coursedelete/${course_id}`,{
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data)
        setaltmessage({ msg: "Data Delete Successfully", type: "success" })
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
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
          <Collapse in={open}>
            <Alert severity={altmessage.type}>
              {altmessage.msg}
            </Alert>
          </Collapse>
        </Stack>
        {/* ======================alert box end ======================== */}
        <Grid container>

            <Grid item xs={12} md={8}  sx={{ margin: 'auto', textAlign:'right' }}>
             
    
            <FormControl sx={{ mb: 3,mt:5, width: '25ch' }} variant="outlined" >
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
    
         
            <Grid item xs={12} md={8}  sx={{ margin: 'auto' }}>
        
              <TableContainer component={Paper} > 
           
                <Table  aria-label="customized table">
                  <TableHead >
                    <TableRow sx={{ textAlign: 'center' }}>
                      <StyledTableCell sx={{ fontSize: '17px' }}>No</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Course Name</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Update</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: '17px' }}>Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {rows.length > 0 &&
    rows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                            {index + 1 + start}
                          </StyledTableCell>
                          <StyledTableCell align="center" sx={{ fontSize: '16px' }}>{row.coursename}</StyledTableCell>
                          <StyledTableCell align="center" sx={{ color: 'green', fontWeight: "bold", textDecoration: "underline" }}><Link to={`/updatecourse/${row.update}`} style={{ cursor: 'pointer', fontSize: '30px!important' }}><TaskAltIcon /></Link></StyledTableCell>
                          <StyledTableCell align="center" sx={{ color: 'red', fontWeight: "bold", textDecoration: "underline" }}><a onClick={() => handleDelete(row.deletes)} style={{ cursor: 'pointer', fontSize: '22px!important' }}><DeleteForeverIcon /></a></StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>

                </Table>

              </TableContainer>

            </Grid>
        
          <Grid item xs={12} md={12}  sx={{ margin: 'auto' }}>

          <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '20px' }}>
            <Stack direction="row" spacing={2} sx={{ paddingTop: '10px', textAlign: 'center' }}>
              <Pagination count={lastpage} variant="outlined" page={page}
                onChange={handleChange} />
            </Stack>
          </Box>
          </Grid>
        
        
       </Grid>
      </Container>
    </>
  )
}

export default Viewcourse
