import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AxiosInstance from "../config/axiosInstance";

const Signup:React.FC = ()=>{
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const signup = async () => {
        try {
            const response = await AxiosInstance.post('/users/register', {
                fullName, email, password
            });
            console.log(response);

            setEmail('');
            setFullName('');
            setPassword('');

            // Display success message
            setSuccessMessage('Signup successful!');

            // Clear any previous error message
            setErrorMessage('');


            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            setErrorMessage('Invalid password or email already exists. Please try again.');
            console.log(error);
        }
    }


    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: 'radial-gradient(circle, #220233, #000000)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div className="container position-relative p-4 bg-white bg-opacity-90 shadow-lg rounded-3">

                <h1 className="h3 fw-bold text-center text-primary mb-4">
                    Signup
                </h1>
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                                className="form-control"
                                placeholder="Full Name here"
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email here"
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password here"
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <button
                            className="btn btn-primary w-100"
                            onClick={signup}
                        >
                            Register Now
                        </button>
                        {errorMessage && (
                            <p className="text-danger mt-2">{errorMessage}</p>
                        )}
                    </div>
                    <div className="col-12 mt-2">
                        <Link
                            to="/login"
                            className="btn btn-outline-primary w-100"
                        >
                            Already have an Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;