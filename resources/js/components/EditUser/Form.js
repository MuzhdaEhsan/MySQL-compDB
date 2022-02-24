import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Edit a user:</p>

                {/* User name */}
                <div className="row mb-3">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                    <div className="col-md-6">
                        <input 
                            id="name" 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            defaultValue={originalName} 
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
                            defaultValue={originalEmail}
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
                                defaultChecked={originalIsAdmin === "1" ? true : false}
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
                                defaultChecked={originalIsAdmin === "" ? true : false}
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
