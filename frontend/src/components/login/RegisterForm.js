import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../home/inputs/registerInput';
import * as Yup from 'yup';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import RingLoader from 'react-spinners/RingLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: currentDate.getFullYear(),
    bMonth: currentDate.getMonth() + 1,
    bDay: currentDate.getDate(),
    gender: '',
  };

  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const days = Array.from(new Array(31), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required('First Name is required.')
      .matches(
        /^[a-zA-Z]+$/,
        'Numbers and special characters are not allowed.'
      ),
    last_name: Yup.string()
      .required('Last Name is required.')
      .matches(
        /^[a-zA-Z]+$/,
        'Numbers and special characters are not allowed.'
      ),
    email: Yup.string()
      .required('Email is required.')
      .email('Must be a valid email address.'),
    password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters.')
      .max(12, 'Password cannot be more than 12 characters.'),
  });
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`${'http://localhost:8000/register'}`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      setDateError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                'It appears that you are not at least 14 years old. Please enter a valid birth date.'
              );
            } else if (gender === '') {
              setDateError('');
              setGenderError(
                'Please select a gender. You can choose who can see this later.'
              );
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="regi_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />

                <RegisterInput
                  type="email"
                  placeholder="Mobile Number or Email Address"
                  name="email"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of Birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bMonth={bMonth}
                  bDay={bDay}
                  bYear={bYear}
                  handleRegisterChange={handleRegisterChange}
                  months={months}
                  days={days}
                  years={years}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <RingLoader color="#1876f2" loading={loading} size="40px" />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
