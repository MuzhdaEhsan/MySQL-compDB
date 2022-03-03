import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";


import Form from "./Form";


const UsersEditView = () => {

    // States
    
     // Helper methods
   
     const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#userEditForm");

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
                        Update
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

export default UsersEditView;

if (document.getElementById("users-edit-view")) {
    ReactDOM.render(
        <UsersEditView />,
        document.getElementById("users-edit-view")
    );
}
