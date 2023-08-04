import React, { useEffect, useState } from "react"
import { Link  } from "react-router-dom";
import backgroundImage from './image/20547283_6310507.jpg';
import logoImg from '../logo.png'
import axios from "axios";
import {
    Avatar, Box, Button, Checkbox, Container, CssBaseline,
    FormControlLabel,
    Grid, Paper, TextField, Typography,
} from '@mui/material'

function Login() {

    // const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  
    useEffect(() => {
        console.log(localStorage.getItem('token'))
},[])

    const handleSubmit = () => {
          axios.post('http://localhost:5000/login',{
          password:password,
          email:email
        })
          .then(function (response) 
        {
         console.log(response)
            if(response.data.status === 'Login Successfully')
            {
                localStorage.setItem('token', response.data.token)
                window.location = '/dashboard' ;
            }
            else
            {
              alert("data not Found...")
            }
        })
          .catch(function (error) {
            if (error.response && error.response.status === 400) {
              alert('Password not Match'); 
            } else {
              console.log(error);
            }
          });
      };

     return (
        <>
        <div>
            <Container sx={{ height: '100vh'}}>
            <CssBaseline />
                <Box sx={{ paddingTop: 10 , marginBottom:4, height: '100vh' }}>
                    <Grid container>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            component={Paper}
            elevation={10}
           
                            sx={{
                              
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize:"90%",
                                backgroundPosition: 'center',
                                borderTopLeftRadius: '20px',
                                borderBottomLeftRadius: '20px',
                            }}
                        ></Grid>
                        <Grid item xs={12} sm={8} md={5}   component={Paper}
            elevation={10}
            square sx={{  borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',}}>
                            <Box sx={{
                                my: 3,
                                mx: 4,
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Avatar alt="" src={`${logoImg}`} sx={{ width: 50, height: 50 }} />
                                <Typography variant="h6" sx={{ mt: 2 }}> Sign In</Typography>
                                <Box component="form" xs={{ mt: 100 }}
                               
                                >
                                    <TextField
                                        margin="normal"
                                        autoComplete="email"
                                        fullWidth
                                        required
                                        id='email'
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></TextField>

                                    <TextField
                                        margin="normal"
                                        autoComplete="current-password"
                                        fullWidth
                                        required
                                        id='password'
                                        label="password"
                                        name="password"
                                        type="password"
                                        autoFocus
                                        onChange={(e) => setPassword(e.target.value)}

                                    ></TextField>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"

                                    />
                                    <Button variant="contained" type="button" onClick={handleSubmit} fullWidth sx={{ mt: 1, mb: 3 }}>Login</Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link to="/register" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            </div>
        </>
    )
}

export default Login
