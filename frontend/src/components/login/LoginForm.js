import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from '../home/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';
import RingLoader from 'react-spinners/RingLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const loginInfos = {
  email: '',
  password: '',
};

export default function LoginForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email address.'),
    password: Yup.string().required('Password is required.'),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${'http://localhost:8000'}/login`, {
        email,
        password,
      });

      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt=""></img>
        <span>
          Facebook recreation project by Tanner Oaks. Created with Node.js and
          React.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email Address or Phone Number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log in
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgot your password?
          </Link>
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create A Page </b>
          for a celebrity, brand, or business.
        </Link>
      </div>
    </div>
  );
}
