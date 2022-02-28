import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Create a new course:</p>

                {/* Course code */}
                <div className="mb-3">
                    <label htmlFor="course_code" className="form-label">
                        Course code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="course_code"
                        name="course_code"
                        placeholder="ABCD-1234"
                    />
                </div> 

                {/* Course full name */}
                <div className="mb-3">
                    <label htmlFor="course_full_name" className="form-label">
                        Full name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="course_full_name"
                        name="course_full_name"
                        placeholder="Psychology"
                    />
                </div>  
            </div>
        </div>
    );
};

export default Form;
