import React from 'react'
import { Container, Typography, Button, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import './Auth.scss'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useNavigation } from 'react-router-dom'
// import {signup, login} from '../../redux/auth/authSlice';
import Logo from '../../images/bird.png'

const initialState = { name: '', username: '', email: '', password: '', confirmPassword: '', phone: '' }

const Auth = () => {

    const dispatch = useDispatch();
    // const navigation = useNavigation();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            // dispatch(signup(formData, navigation))
        } else {
            // dispatch(login(formData, navigation))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => setIsSignup((prevState) => !prevState)

    const handleShowPassword = () => setShowPassword((prevState) => !prevState);

    return (
        <div className='login'>
            <Container maxWidth="xs">
                <Grid>
                    <Grid item xs={6}>
                        <Paper className='paper' sx={{ direction: 'column', justifyContent: 'center' }}>
                            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                <img src={Logo} alt="Logo" style={{ height: '40px', width: '80px', alignSelf: 'center' }} />
                                <Typography color={'gray'} marginBottom={'20px'} variant='body2' align='center'>Connect to the world with <span style={{color:'black'}}><b>Chatter</b>!</span></Typography>
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
                                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                    {
                                        isSignup &&
                                        <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                                    }
                                    {
                                        isSignup &&
                                        <Input name='phone' label='Phone Number' handleChange={handleChange} type='text' />
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