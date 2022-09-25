import './style.css';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/home/inputs/logininput';

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt=""></img>
            <span>
              Facebook recreation project by Tanner Oaks. Created with Node.js
              and React.
            </span>
            <div className="login_2">
              <div className="login_2_wrap">
                <Formik>
                  {(formik) => (
                    <Form>
                      <LoginInput />
                      <button type="submit" className="blue_btn">
                        Log in
                      </button>
                    </Form>
                  )}
                </Formik>
                <Link to="/forgot" className="forgot_password">
                  Forgot your password?
                </Link>
                <div className="sign_splitter"></div>
                <button className="blue_btn open_signup">Create Account</button>
              </div>
              <Link to="/" className="sign_extra">
                <b>Create A Page </b>
                for a celebrity, brand, or business.
              </Link>
            </div>
          </div>
          <div className="register"></div>
        </div>
      </div>
    </div>
  );
}
