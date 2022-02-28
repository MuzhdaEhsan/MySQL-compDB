import React, { useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const CourseModal = ({ addItem, setCourses, setSelectedCourses }) => {
    // States
    const [courseFullName, setCourseFullName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    // Helper methods
    const saveCourse = async () => {
        try {
            if (!courseFullName) return;

            const { data } = await axios.post("/courses", {
                course_full_name: courseFullName,
                course_code: courseCode,
            });

            addItem(data?.course, setCourses, setSelectedCourses);

            // Clear inputs and hide the modal
            setCourseFullName("");
            setCourseCode("");
            
            Modal.getInstance(
                document.getElementById("createNewCourseModal")
            ).hide();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade"
            id="createNewCourseModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* Modal title */}
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add a new Course
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">

                        {/* Course code */}
                        <div className="mb-3">
                            <label
                                htmlFor="course_code"
                                className="form-label"
                            >
                                Course Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="course_code"
                                name="course_code"
                                value={courseCode}
                                onChange={(event) =>
                                    setCourseCode(event.target.value)
                                }
                            />
                        </div>
                        {/* Course full name */}
                        <div className="mb-3">
                            <label
                                htmlFor="course_full_name"
                                className="form-label"
                            >
                                Full name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="course_full_name"
                                name="course_full_name"
                                value={courseFullName}
                                onChange={(event) =>
                                    setCourseFullName(event.target.value)
                                }
                            />
                        </div>

                        
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={saveCourse}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;
