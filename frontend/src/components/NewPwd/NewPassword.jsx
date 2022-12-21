import React from 'react'
import './NewPassword.scss'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_USER } from '../../axios';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import { ErrorMessage } from '@hookform/error-message'


const NewPassword = () => {

    const { state } = useLocation();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        (async () => {
            try {
                if (data["Password"] === data["Confirm Password"]) {

                    dispatch(showLoading())
                    const response = await API_USER.patch('/changePassword', { phone: state, password: data["Password"] });
                    if (response.data.status === 'success') {
                        dispatch(hideLoading());
                        toast.success('Redirecting to login page..');
                        navigate('/');
                    }
                } else {
                    toast.error('Please type the same password!');
                }
            } catch (error) {
                dispatch(hideLoading());
                console.log(error);
            }
        })();

    }


    return (
        <div className='resetPassword'>
            <div className="form-container">
                <h3>Enter New Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="">Password</label>
                        <div className="input">
                            <input type="password" placeholder="Password" {...register("Password", { required: "Please enter the password!", max: 8, min: 1, maxLength: 8 })} />
                            <div className='error-msg'><ErrorMessage errors={errors} name='Password' /></div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <div className="input">
                            <input type="password" placeholder="Confirm Password" {...register("Confirm Password", { required: "Please enter the password!", max: 8, min: 1, maxLength: 8 })} />
                            <div className='error-msg'><ErrorMessage errors={errors} name='Confirm Password' /></div>
                        </div>
                    </div>

                    <div className="submit-btn">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default NewPassword