import React from 'react'
import Input from '../Auth/Input'
import './AdminLogin.scss'
import { Container, Typography, Button, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../../images/bird.png';
import { API } from '../../axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'

const initialState = { email: '', password: '' }



const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevState) => !prevState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const response = await API.post('/admin/login', formData);
            dispatch(hideLoading());
            if (response.data.status === 'success') {
                toast.success('Welcome');
                localStorage.setItem('adminToken', response.data.data.adminToken);
                navigate('/admin/home');
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error(error.response.data.message);
        }
    };

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
                            <Typography variant='h5' align='center' marginBottom={'10px'}>ADMIN LOGIN</Typography>
                            <form className='form' onSubmit={handleSubmit}>
                                <Grid container spacing={2}>

                                    <Input name='email' label='Email' handleChange={handleChange} type='email' />
                                    <Input name='password' label='Password' value={formData?.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                    <Button className='submit-btn' type='submit' variant='contained'>
                                        Login
                                    </Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default AdminLogin