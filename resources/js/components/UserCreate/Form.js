import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Create a new user:</p>

                {/* User name */}
                <div className="row mb-3">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                    <div className="col-md-6">
                        <input 
                            id="name" 
                            type="text" 
                            className="form-control" 
                            name="name"  
                        />
                    </div>
                </div>
                

                {/* Email Address */}
                <div className="row mb-3">
                    <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                    <div className="col-md-6">
                        <input 
                            id="email_address" 
                            type="email" 
                            className="form-control" 
                            name="email_address" 
                        />
                    </div>
                </div>
                {/* Password */}
                <div className="row mb-3">
                    <label htmlFor="user_password" className="col-md-4 col-form-label text-md-right">Password</label>

                    <div className="col-md-6">
                        <input 
                            id="user_password" 
                            type="password" 
                            className="form-control" 
                            name="user_password" 
                           />
                    </div>
                </div>
                {/* confirm password */}
                <div className="row mb-3">
                    <label htmlFor="password_confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                    <div className="col-md-6">
                        <input 
                            id="password_confirm" 
                            type="password" 
                            className="form-control" 
                            name="password_confirm" 
                            />
                    </div>
                </div>
                
                <div className="row mb-3">
                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">User Role</label>
                    <div className="col-md-6">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="Admin"
                                value="1"
                            />
                            <label className="form-check-label" htmlFor="Admin">
                                Admin
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="Staff"
                                value="0"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="Staff">
                                Staff
                            </label>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Form;
