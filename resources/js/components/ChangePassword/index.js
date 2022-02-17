import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";


import Form from "./Form";

const ChangePasswordView = () => {

    // States
    // Helper methods

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#userChangePassForm");

        form.submit();
    };
    
    return (
        <div className="container py-4">
            <Form />
            
            {/* Submit button  */}
            <div className="d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitForm}
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordView;

if (document.getElementById("users-changePass-view")) {
    ReactDOM.render(
        <ChangePasswordView />,
        document.getElementById("users-changePass-view")
    );
}
