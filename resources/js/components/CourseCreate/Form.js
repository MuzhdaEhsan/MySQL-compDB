import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Create a new course:</p>

                {/* Course short name */}
                <div className="mb-3">
                    <label htmlFor="course_full_name" className="form-label">
                        Short name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="course_full_name"
                        name="course_full_name"
                        placeholder="Problem-solving"
                    />
                </div>  
            </div>
        </div>
    );
};

export default Form;
