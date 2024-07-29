import contactImage from './images/contact-image.png'; // Import the image

import { toast } from 'react-toastify';

const Contact = () => {

  const submitMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Perform any form validation or submission logic here

    // Show toast message on successful form submission
    toast.success('Message submitted successfully!', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

    return (
  <div className="container-fluid">

    <div className="row p-4 gy-4">

     
      <div className="p-0 col-xs-12 col-sm-6 col-md-6 col-lg-6">

 {/* Contact Image Section */}
        <img className="img-fluid "  src={contactImage}  />
      </div>


 {/* Contact Form Section */}
      <div className="ps-sm-4  col-xs-12 col-sm-6 col-md-6 col-lg-6">



        {/* Contact Form */}
        <form className="border border-secondary-subtle p-4 shado mt-4" onSubmit={submitMessage}>
      
          <h2 className="text-center  fw-bold">Contact Us </h2>

           {/* Name Input */}
          <div className="mb-3">
            <label for="FormControlInput1 " className="form-label fw-bold ">Name: </label>
            <input type="text" className="form-control" id="FormControlInput1" placeholder="Enter your name" />
          </div>

   {/* Email Input */}
          <div className="mb-3">
            <label for="FormControlInput2" className="form-label fw-bold ">Email: </label>
            <input type="email" className="form-control" id="FormControlInput2" placeholder="Enter your email" />
          </div>

        {/* Message Input */}
          <div className="mb-3">
            <label for="FormControlTextarea1" className="form-label fw-bold ">Message: </label>
            <textarea className="form-control" id="FormControlTextarea1" rows="3"
              placeholder="Enter your message"></textarea>
          </div>


           {/* Submit Button */}
          <div className="mb-3 d-flex justify-content-center">
            
            <button className="btn btn-warning btn-block w-25 fw-bold  " type="submit">Submit</button>
          </div>



        </form>


      </div>

    </div>

  </div>
)
}

  export default Contact