import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {

    // Fetch user data from Redux state
    const { user } = useSelector(state => state.authState);

    return (
        <div className="row justify-content-around mt-5 user-info">

            {/* Avatar and Edit Profile Button */}
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>

                    {/* Display user avatar, defaulting to a placeholder if none */}
                    <img className="rounded-circle img-fluid" src={user.avatar ?? './images/default_avatar.png'} alt='' />
                </figure>


                {/* Link to edit user profile */}
                <div className="mb-3 d-flex justify-content-center">
                    <Link to="/myprofile/update" id="edit_profile" className="btn bg-warning mt-3 fw-bold text-black"  >
                        Edit Profile
                    </Link>
                </div>
            </div>

            {/* User Information Section */}
            <div className="col-12 col-md-5">

                {/* Display user's full name */}
                <h4 className='text-black'>Full Name</h4>
                <p>{user.name}</p>

                {/* Display user's email address */}
                <h4 className='text-black'>Email Address</h4>
                <p>{user.email}</p>

                {/* Display user's join date */}
                <h4 className='text-black'>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                {/* Link to view user's orders */}
                <Link to="/orders" className="btn bg-warning  me-3  mb-5 btn-block fw-bold mt-3 text-black">
                    My Orders
                </Link>

                {/* Link to update user password */}
                <Link to="/myprofile/update/password" className="btn mb-5  bg-warning btn-block mt-3 text-black fw-bold">
                    Update Password
                </Link>
            </div>
        </div>
    )
}