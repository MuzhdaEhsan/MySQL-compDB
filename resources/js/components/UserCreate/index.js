import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";


import Form from "./Form";


const UsersCreateView = () => {

    // States
    
     // Helper methods
     

    const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#userCreateForm");

        form.submit();
    };

    return (
        <div className="container py-4">
            <Form />
            
            {/* Submit button  */}
            <div className="d-flex justify-content-center">
                
                <div className="col-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitForm}
                    >
                        Create
                    </button>
                </div>
                <div className="col-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={cancelForm}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersCreateView;

if (document.getElementById("users-create-view")) {
    ReactDOM.render(
        <UsersCreateView />,
        document.getElementById("users-create-view")
    );
}
