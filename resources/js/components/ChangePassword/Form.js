import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Change user password:</p>

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
            </div>
        </div>
    );
};

export default Form;
