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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/emailValidator';
import AutoComplete from '../../components/AutoComplete'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../store/apiSlice';
import fireBaseAuth from '../../utils/fireBaseAuth';



const theme = createTheme();

export default function Register() {
    const [errorMsg, setErroMsg] = React.useState(null)


    const navigate = useNavigate()
    const api = useSelector((state) => state.api)
    const dispatch = useDispatch()
    React.useEffect(() => {

        dispatch(fetchCountries())
    }, [dispatch])



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const email = data.get('email')
        const country = data.get('Country')
        const password = data.get('password')
        const password2 = data.get('password2')
        //eslint-disable-next-line
        const allowPromotions = data.get('checkbox')
        const invalidMail = validateEmail(email)
        if (!invalidMail && password2 === password && password.length >= 8 && password2.length >= 8 && firstName.length > 0 && lastName.length > 0) {
            const result = await fireBaseAuth.signUp(email, password, firstName, lastName, country)
            if (result.uid !== undefined) {
                navigate('/login')
            } else {
                setErroMsg({ message: 'Email already exists in our database', code: 3 })
            }

        } else if (firstName.length === 0) {
            setErroMsg({ message: 'Please enter a first name', code: 1 })
        } else if (lastName.length === 0) {
            setErroMsg({ message: 'Please enter a last name', code: 2 })
        } else if (invalidMail) {
            setErroMsg({ message: 'Please enter a valid email', code: 3 })
        } else if (password.length <= 8) {
            setErroMsg({ message: 'Password too short enter atleast 8 characters', code: 4 })
        } else if (password !== password2) {
            setErroMsg({ message: 'Wrong password confirmation entered', code: 5 })
        }

    }


    return (
        <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {errorMsg ? errorMsg.message : 'Sign up'}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    title='Please enter your First name'
                                    sx={{ backgroundColor: errorMsg && errorMsg.code === 1 && 'rgba(245, 132, 132, 0.44)' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    title='Please enter your Last name'
                                    sx={{ backgroundColor: errorMsg && errorMsg.code === 2 && 'rgba(245, 132, 132, 0.44)' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    title='Please enter a valid Email : example@somedomain.com'
                                    sx={{ backgroundColor: errorMsg && errorMsg.code === 3 && 'rgba(245, 132, 132, 0.44)' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AutoComplete label={'Country'} array={api.countries} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    title='Please enter a password atleast 8 characters long'
                                    sx={{ backgroundColor: errorMsg && errorMsg.code === 4 && 'rgba(245, 132, 132, 0.44)' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Confirm Password"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password"
                                    title='Please confirm your password'
                                    sx={{ backgroundColor: errorMsg && errorMsg.code === 5 && 'rgba(245, 132, 132, 0.44)' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value={'true'} color="primary" name='checkbox' id='checkbox' />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={'/login'}>
                                    <Typography color={'blue'}>Already have an account? Sign in</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}