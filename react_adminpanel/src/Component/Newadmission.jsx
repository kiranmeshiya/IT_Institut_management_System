import * as React from 'react';
import { Box, Button, Container, TextField, Typography, InputLabel, Select, FormControl, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dashboard from './Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// ===================== Successbox files ================== 
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




function Newadmission() {

  const [courses, setCourses] = useState([]);
  const [content, setContent] = useState("");
  const [value, setValue] = React.useState('1');
  const [ermessage, setErmessage] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [studentimage,setStudentimage] = React.useState()
  const defaultVal = {
    surname: "",
    studentname: "",
    fathername: "",
    stu_contact_no: "",
    stu_whatsapp_no: "",
    parent_contact_no: "",
    parent_whatsapp_no: "",
    address: "",
    dob: "",
    image: "",
    qualification: "",
    reference: "",
    course: "",
    course_duration: "",
    daily_time: "",
    course_content: "",
    total_fees: 0,
    joining_date: "",
    ending_date: "",
    job_responsbility: "",
    college_course: "",
    installment_details: [{
      amount: 0,
      installment_date: '',
      p_status: "0",
    }],
    faculty: "",
    batch_time: "",
    running_topic: "",
    pc_laptop: "",
    pc_no: "",
    laptop_compulsory: "",
    gst: "",
    extra_note: "",
    reception_note: ""
  }

  const [val, setVal] = React.useState(defaultVal)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = () => {

    setVal((prevVal) => ({
      ...prevVal,
      installment_details: [
        ...prevVal.installment_details,
        {
          amount: '',
          installment_date: '',
          p_status: "0",
        }
      ]
    }));
  }

  const handleDelete = () => {
    setVal((prevVal) => {
      if (prevVal.installment_details.length > 1) {
        return {
          ...prevVal,
          installment_details: prevVal.installment_details.slice(0, -1)
        }
      }
      return prevVal
    })
  }
  const handleChange1 = (e, index) => {

    const { name, value } = e.target;
    if (name === 'amount' || name === 'installment_date') {
      setVal((prevVal) => {
        const addInstallment = [...prevVal.installment_details];
        addInstallment[index] = {
          ...addInstallment[index],
          [name]: value
        };
        return {
          ...prevVal,
          installment_details: addInstallment
        };
      });

    }
    else {
      setVal((prevVal) => ({
        ...prevVal,
        [name]: value,
      }));
    }



  };
  const token = localStorage.getItem('token')

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


  const handlegetData = (id) => {
    axios.get(`http://localhost:5000/course/viewsinglecourse/${id}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(function (response) {
        console.log(response.data)
        const data = response.data.data;
        setContent(data);
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

  const handleSubmit = () => {

    const totalInstallmentfees = val.installment_details.reduce((total, item) => total + parseInt(item.amount), 0);
    const totalFees = parseInt(content.content_id?.total_fees);

    const installmentDetails = val.installment_details.map((item) => ({
      amount: item.amount,
      installment_date: item.installment_date,
      p_status: item.p_status
    }));

    if (totalInstallmentfees === totalFees) {

      axios.post('http://localhost:5000/course/newadmission', {
        surname: val.surname,
        studentname: val.studentname,
        fathername: val.fathername,
        stu_contact_no: val.stu_contact_no,
        stu_whatsapp_no: val.stu_whatsapp_no,
        parent_contact_no: val.parent_contact_no,
        parent_whatsapp_no: val.parent_whatsapp_no,
        address: val.address,
        dob: val.dob,
        image: val.image,
        qualification: val.qualification,
        reference: val.reference,
        course: val.course,
        course_duration: content.content_id?.duration || "",
        course_content: content.content_id?.content || "",
        total_fees: parseInt(content.content_id?.total_fees || 0),
        daily_time: val.daily_time,
        joining_date: val.joining_date,
        ending_date: val.ending_date,
        job_responsbility: val.job_responsbility,
        college_course: val.college_course,
        installment_details: installmentDetails,
        faculty: val.faculty,
        batch_time: val.batch_time,
        running_topic: val.running_topic,
        pc_laptop: val.pc_laptop,
        pc_no: val.pc_no,
        laptop_compulsory: val.laptop_compulsory,
        gst: val.gst,
        extra_note: val.extra_note,
        reception_note: val.reception_note
      }, {
        headers: {
          'Authorization': token
        }
      })

        .then(function (response) {
          console.log(response.data)

          if (response.data.status === 'Add new admission Successfully') {
            handleClickOpen();
          }
          else {
            setErmessage("Your Data is not add Successfully")
            setOpen1(true);
            setTimeout(() => {
              setOpen1(false)
            }, 5000);
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 400) {
            setErmessage(error.response.data.error.message);
            setOpen1(true);
            setTimeout(() => {
              setOpen1(false)
            }, 5000);
          } else {
            console.log(error);
          }
        });
    }
    else {
      setErmessage("Your Total Fees and your Installment total are different")
      setOpen1(true);
      setTimeout(() => {
        setOpen1(false)
      }, 5000);
    }
  }

  // =============== Successbox setup start ==================
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location = '/dashboard'
  };
  // =============== Successbox setup End ==================
  return (
    <>
      <Dashboard />
      <Container className='responsive'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Personal Information" value="1" />
                <Tab label="Course Information" value="2" />
                <Tab label="Faculty Information" value="3" />
              </TabList>
              {/* ========================== alert Box================== */}
              <Stack sx={{ width: '100%' }} spacing={2} >
                <Collapse in={open1}>
                  <Alert severity="error">
                    {ermessage}
                  </Alert>
                </Collapse>
              </Stack>
              {/* ======================alert box end ======================== */}
            </Box>
            <form>
              <TabPanel value="1">
                <Grid item xs={12} md={12} component={Paper}
                  elevation={10}
                  square margin='auto' sx={{ borderRadius: "10px", padding: "20px 30px" }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                    <Typography variant="h4" sx={{ mt: 1, mb: 4, fontWeight: 'bold' }}> Personal Details</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Box xs={{ mt: 5 }} >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Surname here'
                              margin="normal"
                              label="Surname"
                              name="surname"
                              size="small"
                              value={val.surname}
                              onChange={handleChange1}
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Student name  here'
                              margin="normal"
                              label="Student Name"
                              name="studentname"
                              value={val.studentname}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Father name here'
                              margin="normal"
                              label="Father Name"
                              name="fathername"
                              value={val.fathername}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Student Contact No  here'
                              margin="normal"
                              label="Student Contact No."
                              name="stu_contact_no"
                              value={val.stu_contact_no}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Student Whatsapp No  here'
                              margin="normal"
                              label="Student Whatsapp No."
                              name="stu_whatsapp_no"
                              value={val.stu_whatsapp_no}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Parents Contact No  here'
                              margin="normal"
                              label="Parent Contact No."
                              name="parent_contact_no"
                              value={val.parent_contact_no}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Parent Whatsapp No  here'
                              margin="normal"
                              label="Parent Whatsapp No."
                              name="parent_whatsapp_no"
                              value={val.parent_whatsapp_no}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                            <TextField
                              placeholder='Enter Qualification  here'
                              margin="normal"
                              label="Qualification"
                              name="qualification"
                              value={val.qualification}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%', marginTop: '20px' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Address here'
                              margin="normal"
                              label="Address"
                              name="address"
                              multiline
                              rows={4}
                              value={val.address}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>

                            <TextField
                              type='date'
                              autoFocus
                              margin="normal"
                              label="Date of Birth"
                              InputLabelProps={{ shrink: true }}
                              name="dob"
                              value={val.dob}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%', marginTop: '20px' }}
                            ></TextField>

                          </Grid>
                          <Grid item xs={12} md={6} sx={{ marginBottom: '0!important', paddingTop: '9px!important', marginTop: '10px' }}>
                            <input
                              accept="image/*" // Specify the file types allowed for upload (e.g., image, audio, etc.)
                              style={{ display: 'none', marginTop: '20px' }} // Hide the default file input appearance
                              id="file-upload"
                              name='image'
                              type="file"
                              value={val.image}
                              // value="image/134.jpg"
                              onChange={handleChange1}

                            />
                             {/* <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input> */}
                            <label htmlFor="file-upload">
                              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                                Upload Student Image
                              </Button>
                            </label>
                          </Grid>

                          <Grid item xs={12} md={12} sx={{ marginBottom: '0!important', paddingTop: '0!important', textAlign: 'right' }}>
                            <Button variant="contained" type="button" margin="normal" sx={{ mt: 2, mb: 2, padding: '7px 20px' }} onClick={() => setValue("2")}> <KeyboardDoubleArrowRightIcon sx={{ fontSize: '27px', paddingLeft: '10px' }} /></Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
              <Grid item xs={12} md={12} component={Paper}
                  elevation={10}
                  square margin='auto' sx={{ borderRadius: "10px", padding: "20px 30px" }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                    <Typography variant="h4" sx={{ mt: 1, mb: 4, fontWeight: 'bold' }}> Course Details</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Box xs={{ mt: 5 }} >
                        <Grid container spacing={2}>

                          <Grid item xs={12} md={4} sx={{ margin:{xs:'35px, auto, 0'}, marginTop: '15px', marginBottom: '0!important', paddingTop: '0!important' }}>
                           
                              <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                                <InputLabel id="demo-controlled-open-select-label">Course</InputLabel>
                                <Select
                                  labelId="demo-controlled-open-select-label"
                                  id="demo-controlled-open-select"
                                  name='course'
                                  label="Course"
                                  size='small'
                                  value={val.coursename}
                                  onChange={(e) => { handleChange1(e); handlegetData(e.target.value) }}
                                // onChange={handleChange1}
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
                          <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Course Content here'
                              margin="normal"
                              label="Course Content"
                              name="course_content"
                              value={content.content_id?.content ||""}
                              onChange={handleChange1}
                              InputProps={{ readOnly: true }} // Use InputProps to set readOnly instead of disabled
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Duration here'
                              margin="normal"
                              label="Course Duration"
                              name="course_duration"
                              value={content.content_id?.duration || ""}
                              onChange={handleChange1}
                              InputProps={{ readOnly: true }} // Use InputProps to set readOnly instead of disabled
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Reference  here'
                              margin="normal"
                              label="Reference"
                              name="reference"
                              value={val.reference}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>

                          <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Daily Time here'
                              margin="normal"
                              label="Daily Time"
                              name="daily_time"
                              value={val.daily_time}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>

                          <Grid item xs={12} md={4} sx={{ marginTop: '15px', marginBottom: '0!important', paddingTop: '0!important' }}>
                            <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                              <InputLabel id="demo-controlled-open-select-label">Collage Course</InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                label="Collage Course"
                                size='small'
                                name='college_course'
                                value={val.college_course}
                                onChange={handleChange1}
                              >
                                <MenuItem value='yes'>
                                  Yes
                                </MenuItem>
                                <MenuItem value='no'>
                                  No
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4} sx={{ marginTop: '15px', marginBottom: '5px!important', paddingTop: '0!important', textAlign: 'left' }}>
                            <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                              <InputLabel id="demo-controlled-open-select-label">GST</InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={val.gst}
                                onChange={handleChange1}
                                label="GST"
                                size='small'
                                name='gst'
                              >
                                <MenuItem value='yes'>
                                  Yes
                                </MenuItem>
                                <MenuItem value='no'>
                                  No
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          
                          <Grid item xs={8} md={4} sx={{ marginBottom: '5px!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Total Fees here'
                              margin="normal"
                              label="Total Fees"
                              name="total_fees"
                              InputProps={{ readOnly: true }} // Use InputProps to set readOnly instead of disabled
                              value={content.content_id?.total_fees || ""}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>

                          <Grid item xs={2} md={2} sx={{ marginBottom: '5px!important', paddingTop: '0!important' }}>
                            <Button variant="contained" type="button" margin="normal" sx={{ mt: 2, mb: 2, padding: '7px 20px' }} onClick={handleAdd}> + </Button>
                          </Grid>

                          <Grid item xs={12} md={12} sx={{ marginBottom: '5px!important', paddingTop: '0!important' }}>
                            <Typography sx={{ mt: 1, mb: 1, fontWeight: 'bolder', color: 'red', fontSize: '20px', paddingLeft: '5px' }}> Fees Installments : </Typography>
                            <Grid item xs={12} md={12}
                              square margin='auto' sx={{ borderRadius: "10px", alignItems: "center", paddingTop: "30px!important", border: '1px double gray' }}>

                              {val.installment_details.map((c, index) => {
                                return (

                                  <Grid container spacing={2} key={index} >

                                    <Grid item xs={10} md={4} sx={{ marginBottom: '20px!important', paddingTop: '0!important' }}>
                                      <TextField
                                        placeholder='Enter Amount here'
                                        margin="normal"
                                        label="Amount"
                                        name="amount"
                                        value={c.amount}
                                        onChange={(e) => handleChange1(e, index)}
                                        size="small"
                                        sx={{ marginRight: '20px!important', width: '100%', marginLeft: '15px!important' }}
                                      ></TextField>
                                    </Grid>

                                    <Grid item xs={10} md={4} sx={{ marginBottom: '20px!important', paddingTop: '0!important' }}>

                                      <TextField
                                        type='date'
                                        margin="normal"
                                        label="Date Of Installment"
                                        name="installment_date"
                                        InputLabelProps={{ shrink: true }}
                                        value={c.installment_date}
                                        onChange={(e) => handleChange1(e, index)}
                                        size="small"
                                        sx={{ marginRight: '20px', width: '100%', marginTop: '17px', marginLeft: '20px' }}
                                      ></TextField>
                                    </Grid>
                                    <Grid item xs={10} md={4} sx={{ marginBottom: '20px!important', paddingTop: '0!important', textAlign: 'center' }}>

                                      <Button variant="contained" type="button" margin="normal" sx={{ mt: 2, mb: 2, padding: '7px 20px', backgroundColor: 'red', color: 'white' }} onClick={handleDelete} > <DeleteForeverIcon /> </Button>
                                    </Grid>
                                  </Grid>
                                )
                              })}

                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={12} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Extra Note here'
                              margin="normal"
                              label="Extra Note"
                              name="extra_note"
                              multiline
                              rows={2}
                              value={val.extra_note}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={12} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Reception Note here'
                              margin="normal"
                              label="Reception Note"
                              name="reception_note"
                              multiline
                              rows={2}
                              value={val.reception_note}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} md={12} sx={{ marginBottom: '0!important', paddingTop: '0!important', textAlign: 'right' }}>
                            <Button variant="contained" type="button" margin="normal" sx={{ mt: 2, mb: 2, padding: '7px 20px' }} onClick={() => setValue("3")}><KeyboardDoubleArrowRightIcon sx={{ fontSize: '27px', paddingLeft: '10px' }} /></Button>
                          </Grid>
                        </Grid>

                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </TabPanel>
              <TabPanel value="3"> 
              <Grid item xs={12} md={12} component={Paper}
                elevation={10}
                square margin='auto' sx={{ borderRadius: "10px", padding: "20px 30px" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                  <Typography variant="h4" sx={{ mt: 1, mb: 4, fontWeight: 'bold' }}> Faculty Details</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Box xs={{ mt: 5 }} >
                      <Grid container spacing={2}>

                        <Grid item xs={12} md={4} sx={{ marginTop: '15px', marginBottom: '0!important', paddingTop: '0!important' }}>
                          <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                            <InputLabel id="demo-controlled-open-select-label">Device</InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              label="Device"
                              size='small'
                              name='pc_laptop'
                              value={val.pc_laptop}
                              onChange={handleChange1}
                            >
                              <MenuItem value='PC'>
                                PC
                              </MenuItem>
                              <MenuItem value='Laptop'>
                                Laptop
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginTop: '15px', marginBottom: '0!important', paddingTop: '0!important' }}>
                          <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                            <InputLabel id="demo-controlled-open-select-label">Laptop Compulsory</InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              value={val.laptop_compulsory}
                              onChange={handleChange1}
                              label="Laptop Compulsory"
                              size='small'
                              name='laptop_compulsory'
                            >
                              <MenuItem value='Yes'>
                                Yes
                              </MenuItem>
                              <MenuItem value='No'>
                                No
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                          <TextField
                            placeholder='Enter PC Number  here'
                            margin="normal"
                            label="PC Number"
                            name="pc_no"
                            value={val.pc_no}
                            onChange={handleChange1}
                            size="small"
                            sx={{ marginRight: '20px', width: '100%' }}
                          ></TextField>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                          <TextField
                            placeholder='Enter Running Topic  here'
                            margin="normal"
                            label="Running Topic"
                            name="running_topic"
                            value={val.running_topic}
                            onChange={handleChange1}
                            size="small"
                            sx={{ marginRight: '20px', width: '100%' }}
                          ></TextField>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                          <TextField
                            placeholder='Enter Faculty here'
                            margin="normal"
                            label="Faculty"
                            name="faculty"
                            value={val.faculty}
                            onChange={handleChange1}
                            size="small"
                            sx={{ marginRight: '20px', width: '100%' }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12} md={4} sx={{ marginTop: '15px', marginBottom: '0!important', paddingTop: '0!important' }}>
                          <FormControl sx={{ minWidth: {xs:240 , lg:260} }}>
                            <InputLabel id="demo-controlled-open-select-label">Job Responsbility</InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              value={val.job_responsbility}
                              onChange={handleChange1}
                              label="Job Responsbility"
                              size='small'
                              name='job_responsbility'
                            >
                              <MenuItem value='Yes'>
                                Yes
                              </MenuItem>
                              <MenuItem value='No'>
                                No
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                          <TextField
                            type='date'
                            placeholder='Enter Qualification  here'
                            margin="normal"
                            label="Date Of Joining"
                            InputLabelProps={{ shrink: true }}
                            name="joining_date"
                            value={val.joining_date}
                            onChange={handleChange1}
                            size="small"
                            sx={{ marginRight: '20px', width: '100%', marginTop: '20px' }}
                          ></TextField>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }} >

                          <TextField
                            type='date'
                            placeholder='Enter Qualification  here'
                            margin="normal"
                            label="Date Of Ending"
                            InputLabelProps={{ shrink: true }}

                            name="ending_date"
                            value={val.ending_date}
                            onChange={handleChange1}
                            size="small"
                            sx={{ marginRight: '20px', width: '100%', marginTop: '20px' }}
                          ></TextField>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ marginBottom: '0!important', paddingTop: '0!important' }}>
                            <TextField
                              placeholder='Enter Batch Time  here'
                              margin="normal"
                              label="Batch Time"
                              name="batch_time"
                              value={val.batch_time}
                              onChange={handleChange1}
                              size="small"
                              sx={{ marginRight: '20px', width: '100%' }}
                            ></TextField>
                          </Grid>

                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: '0!important', paddingTop: '0!important', textAlign: 'center' }}>
                        <Button variant="contained" type="button" margin="normal" sx={{ mt: 2, mb: 2, padding: '7px 20px' }} onClick={handleSubmit} > Submit </Button>
                      </Grid>


                    </Box>
                  </Box>
                </Box>
              </Grid>
              </TabPanel>
            </form>
          </TabContext>
        </Box>
      </Container >
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
                Your Admission is Successfully Saved!
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Button variant="contained" color="success" onClick={handleClose} sx={{ margin: 'auto', textAlign: 'center' }} >Ok</Button>

            </DialogActions>
          </Box>
        </Dialog>
      </div>
    </>
  );
}

export default Newadmission

