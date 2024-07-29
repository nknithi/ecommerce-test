import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Login() {

  // Local state for email and password input fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  // Redux state for authentication status, loading state, and error messages
  const { loading, error, isAuthenticated } = useSelector(state => state.authState)

  // Determine the redirect path based on query parameters in the URL
  const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }


  // Effect hook to handle redirection and toast notifications based on authentication status and errors
  useEffect(() => {
    console.log("isAuthenticated in login page " + isAuthenticated)

    // Redirect to the specified path if authentication is successful
    if (isAuthenticated) {
      navigate(redirect)
    }


    // Display toast message for errors
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return
    }
  }, [error, isAuthenticated, dispatch, navigate])

  return (

    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
      <MetaData title={`Login`} />
      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
          <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded">

            <h2 className="text-center  fw-bold">Login </h2>

            {/* Email input field */}
            <div className="form-group mb-3">
              <label htmlFor="email_field" className="form-label fw-bold ">Email: </label>

              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>


            {/* Password input field */}
            <div className="form-group mb-3">
              <label htmlFor="password_field" className="form-label fw-bold">Password:</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>


            {/* Submit button */}
            <div className="mb-3 d-flex justify-content-center">

              <button
                id="login_button"
                type="submit"
                className="btn bg-warning w-25 mt-3 fw-bold text-black"
                disabled={loading}
              >
                Login
              </button>
            </div>

            {/* Register Link */}
            <div className="mb-3 d-flex justify-content-center">
              <p>
                Not Registered Yet?{' '}
                <button
                  className="btn text-primary"
                  type="button"
                  onClick={() => navigate('/register')}
                >
                  <u>Register here</u>
                </button>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}