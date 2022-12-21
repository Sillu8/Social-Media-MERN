import React, { useState } from 'react'
import { API_USER } from '../../axios'
import './ForgotPwdOtp.scss'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'

const ForgotPwdOtp = () => {

    const dispatch = useDispatch();
    const { state } = useLocation();


    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');
    const [digit4, setDigit4] = useState('');
    const [digit5, setDigit5] = useState('');
    const [digit6, setDigit6] = useState('');

    const navigate = useNavigate()

    const submit = async () => {
        try {
            dispatch(showLoading());
            const res = await API_USER.patch('/forgotPassword', {
                digit1, digit2, digit3, digit4, digit5, digit6, phone: state
            })
            dispatch(hideLoading());
            if (res.data.status === 'success') {
                toast.success('Enter your new password')
                navigate('/newPassword', { state })
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='otpPage'>
            <div class="prompt">
                Enter the code generated on your mobile device!
            </div>

            <form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                <input maxLength={1} type="text" id="digit-1" name="digit-1" data-next="digit-2" value={digit1} onChange={e => { setDigit1(e.target.value); }} />
                <input maxLength={1} type="text" id="digit-2" name="digit-2" data-next="digit-3" value={digit2} data-previous="digit-1" onChange={e => setDigit2(e.target.value)} />
                <input maxLength={1} type="text" id="digit-3" name="digit-3" data-next="digit-4" value={digit3} data-previous="digit-2" onChange={e => setDigit3(e.target.value)} />
                <span class="splitter">&ndash;</span>
                <input maxLength={1} type="text" id="digit-4" name="digit-4" data-next="digit-5" value={digit4} data-previous="digit-3" onChange={e => setDigit4(e.target.value)} />
                <input maxLength={1} type="text" id="digit-5" name="digit-5" data-next="digit-6" value={digit5} data-previous="digit-4" onChange={e => setDigit5(e.target.value)} />
                <input maxLength={1} type="text" id="digit-6" name="digit-6" data-previous="digit-5" value={digit6} onChange={e => setDigit6(e.target.value)} />
            </form>
            <div className='submitbtn'>
                <button onClick={submit}>SUBMIT</button>
            </div>
        </div>

    )
}

export default ForgotPwdOtp