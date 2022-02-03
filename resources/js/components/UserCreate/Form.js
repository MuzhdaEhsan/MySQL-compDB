import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Create a new user:</p>

                {/* User name */}
                <div class="row mb-3">
                    <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                    <div class="col-md-6">
                        <input 
                            id="name" 
                            type="text" 
                            class="form-control" 
                            name="name"  
                            required autocomplete="name" autofocus
                        />
                    </div>
                </div>
                {/* Email Address */}
                <div class="row mb-3">
                    <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                    <div class="col-md-6">
                        <input 
                            id="email" 
                            type="email" 
                            class="form-control" 
                            name="email" 
                            required autocomplete="email"
                        />
                    </div>
                </div>
                {/* Password */}
                <div class="row mb-3">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                        <input 
                            id="password" 
                            type="password" 
                            class="form-control" 
                            name="password" 
                            required autocomplete="new-password"/>
                    </div>
                </div>
                {/* confirm password */}
                <div class="row mb-3">
                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                    <div class="col-md-6">
                        <input 
                            id="password-confirm" 
                            type="password" 
                            class="form-control" 
                            name="password_confirmation" 
                            required autocomplete="new-password"/>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">User Role</label>
                    <div class="col-md-6">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="Admin"
                                value="A"
                            />
                            <label className="form-check-label" htmlFor="functional">
                                Admin
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="role"
                                id="Staff"
                                value="S"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="functional">
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
