import React from 'react'
import { Container, Typography, Button, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import './Auth.scss'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../../images/bird.png';
import { API } from '../../axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'

const initialState = { name: '', username: '', email: '', password: '', confirmPassword: '', phone: '' }

const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            (async () => {
                try {
                    dispatch(showLoading())
                    const response = await API.post('/user/signup', formData);
                    setFormData(initialState);
                    if (response.data.status === 'success') {
                        dispatch(hideLoading());
                        toast.success('Please verify your phone number!');
                        navigate('/otp', { state: {
                            data: formData,
                            signup: true
                        } });
                    }
                } catch (error) {
                    dispatch(hideLoading());
                    toast.error(error.response.data.message);
                }
            })();
        } else {

            (async () => {
                try {
                    dispatch(showLoading())
                    const response = await API.post('/user/login', formData);
                    dispatch(hideLoading());
                    if (response.data.status === 'success') {
                        localStorage.setItem('token', response.data.data.token);
                        navigate('/home');
                    }else{
                        console.log(response)
                    }
                } catch (error) {
                    dispatch(hideLoading());
                    toast.error(error.response.data.message);
                }
            })();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        handleReset();
        setIsSignup((prevState) => !prevState)
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll('input')).forEach(input => {
            return input.value = '';
        });
    }

    const handleShowPassword = () => setShowPassword((prevState) => !prevState);

    return (
        <div className='login'>
            <Container maxWidth="xs">
                <Grid>
                    <Grid item xs={6}>
                        <Paper className='paper' sx={{ direction: 'column', justifyContent: 'center' }}>
                            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                <img src={Logo} alt="Logo" style={{ height: '40px', width: '80px', alignSelf: 'center' }} />
                                <Typography color={'gray'} marginBottom={'20px'} variant='body2' align='center'>Connect to the world with <span style={{ color: 'black' }}><b>Chatter</b>!</span></Typography>
                            </Grid>
                            <Typography variant='h5' align='center' marginBottom={'10px'}>{isSignup ? 'SIGN UP' : 'LOGIN'}</Typography>
                            <form className='form' onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {
                                        isSignup && (
                                            <>
                                                <Input name='name' label='Name' handleChange={handleChange} type='text' autoFocus half />
                                                <Input name='username' label='Username' handleChange={handleChange} type='text' half />
                                            </>
                                        )
                                    }
                                    <Input name='email' label='Email' handleChange={handleChange} type='email' />
                                    <Input name='password' label='Password' value={formData?.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                    {
                                        isSignup &&
                                        <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                                    }
                                    {
                                        isSignup &&
                                        <Input name='phone' label='Phone Number' handleChange={handleChange} type='text' />
                                    }
                                    {
                                        !isSignup && 
                                        <Grid container justifyContent='center' marginTop={'8px'} sx={{cursor:'pointer'}}>
                                            <Grid item>
                                                <Typography onClick={()=>navigate('/forgotPassword')} variant='body1' align='center' marginBottom={'10px'}>{'Forgot your password?'}</Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    <Button className='submit-btn' type='submit' variant='contained'>
                                        {isSignup ? 'Sign Up' : 'Login'}
                                    </Button>
                                </Grid>
                                <Grid container justifyContent='flex-end'>
                                    <Grid item>
                                        <Button onClick={switchMode} sx={{ marginTop: '5px' }}>
                                            {isSignup ? 'Already have an account? Login' : `Don't have an account? Sign Up`}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Auth