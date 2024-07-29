import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();


    // Handle avatar change and preview
    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0])
            }
        }


        reader.readAsDataURL(e.target.files[0])
    }

    // Handle form submission for updating profile
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    // Effect to update form fields with user data and handle success/error messages
    useEffect(() => {
        if (user) {

            // Set initial form values with user data
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        if (isUpdated) {

            // Notify user when profile is updated successfully
            toast('Profile updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
            return;
        }

        if (error) {

            // Display error message if update fails
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [user, isUpdated, error, dispatch])

    return (
        <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
            <div className="row">
                <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
                    <form onSubmit={submitHandler} className=" p-4 shadow bg-light mt-3 rounded" encType='multipart/form-data'>
                        <h2 className="text-center  fw-bold">Update Profile</h2>

                        {/* Name Input */}
                        <div className="form-group  mb-3">
                            <label htmlFor="email_field" className="form-label fw-bold ">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="form-group  mb-3">
                            <label htmlFor="email_field" className="form-label fw-bold ">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Avatar Input */}
                        <div className='form-group  mb-3'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar me-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChangeAvatar}
                                    />

                                </div>
                            </div>
                        </div>
                        {/* Submit button */}
                        <div className="mb-3 d-flex justify-content-center">
                            <button type="submit" className="btn bg-warning w-25 mt-3 fw-bold text-black"  >Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}