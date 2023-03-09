import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import fireBaseAuth from '../../utils/fireBaseAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserPfp } from '../../store/authSlice';




export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errorMsg, setErrorMsg] = React.useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const response = await fireBaseAuth.signIn(email, password)
        if (response.uid !== undefined) {
            dispatch(updateUserPfp(response.photoURL))
            navigate('/')
        } else {
            if (response.message.includes('password')) {
                setErrorMsg({ message: 'You have entered a wrong password.', code: 2 })
            } else {
                setErrorMsg({ message: 'Email does not exist in our database.', code: 1 })
            }
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#3f3faf' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {errorMsg ? errorMsg.message : 'Sign in'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        title='Please enter a valid Email : example@somedomain.com'
                        sx={{ backgroundColor: errorMsg && errorMsg.code === 1 && 'rgba(245, 132, 132, 0.44)' }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{ backgroundColor: errorMsg && errorMsg.code === 2 && 'rgba(245, 132, 132, 0.44)' }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                <Typography sx={{ color: 'blue' }}>
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/register'} >
                                <Typography sx={{ color: 'blue' }}>
                                    {"Don't have an account? Sign Up"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}