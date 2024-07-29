import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';


export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    // Handle input change for form fields and avatar upload
    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }


            reader.readAsDataURL(e.target.files[0])
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }


    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    };

    // Redirect to login after successful registration
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(logout()).then(() => {
                navigate("/login");
            });
        }
    }, [isAuthenticated, dispatch, navigate]);

    // Display error message if registration fails
    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError()) }
            });
        }
    }, [error, dispatch]);

    return (
        <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
            <div className="row">
                <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
                    <form onSubmit={submitHandler} className="p-4 shadow bg-light mt-3 rounded" encType='multipart/form-data'>

                        <h2 className="text-center  fw-bold">Register </h2>

                        {/* Name Input */}
                        <div className="form-group mb-3">
                            <label htmlFor="email_field" className="form-label fw-bold">Name</label>
                            <input name='name' onChange={onChange} type="text" id="name_field" className="form-control" />
                        </div>

                        {/* Email Input */}
                        <div className="form-group mb-3">
                            <label htmlFor="email_field" className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                name='email'
                                onChange={onChange}
                                className="form-control"

                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-group mb-3">
                            <label htmlFor="password_field" className="form-label fw-bold">Password</label>
                            <input
                                name='password'
                                onChange={onChange}
                                type="password"
                                id="password_field"
                                className="form-control"

                            />
                        </div>

                        {/* Avatar Upload */}
                        <div className='form-group mb-3'>
                            <label htmlFor='avatar_upload' className="form-label fw-bold">Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file ms-3'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        onChange={onChange}
                                        className='custom-file-input'
                                        id='customFile'
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="mb-3 d-flex justify-content-center">

                            <button
                                id="register_button"
                                type="submit"
                                className="btn bg-warning w-25 mt-3 fw-bold text-black"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>



                        {/* Register Link */}
                        <div className="mb-3 d-flex justify-content-center">
                            <p>
                                Already Registered?{' '}
                                <button
                                    className="btn text-primary"
                                    type="button"
                                    onClick={() => navigate('/login')}
                                >
                                    <u>Login</u>
                                </button>{' '}
                            </p>
                        </div>



                    </form>
                </div>
            </div>
        </div>
    )
}