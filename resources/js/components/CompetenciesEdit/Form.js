import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Edit competency:</p>
                {/* Competency type */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="functional"
                        value="F"
                        defaultChecked={originalCode[0] === "F" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="functional">
                        Functional
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="transferrable"
                        value="T"
                        defaultChecked={originalCode[0] === "T" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="transferrable">
                        Transferrable
                    </label>
                </div>

                {/* Competency short name */}
                <div className="mb-3">
                    <label htmlFor="short_name" className="form-label">
                        Short name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="short_name"
                        name="short_name"
                        placeholder="Problem-solving"
                        defaultValue={originalShortName}
                    />
                </div>

                {/* Competency statement */}
                <div className="mb-3">
                    <label htmlFor="statement" className="form-label">
                        Statement
                    </label>
                    <textarea
                        className="form-control"
                        id="statement"
                        name="statement"
                        rows="2"
                        placeholder="Resolve a work-related problem to optimally meet the needs of the business"
                        defaultValue={originalStatement}
                    ></textarea>
                </div>
                {/* Proficiency Level */}
                <div>
                    <label htmlFor="statement" className="form-label">
                        Proficiency Level
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="level"
                        id="Basic"
                        value="B"
                        defaultChecked={originalCode[1] === "B" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="functional">
                        Basic
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="level"
                        id="Intermediate"
                        value="I"
                        defaultChecked={originalCode[1] === "I" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="functional">
                        Intermediate
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="level"
                        id="Developed "
                        value="D"
                        defaultChecked={originalCode[1] === "D" ? true : false}
                    />
                    <label className="form-check-label" htmlFor="functional">
                        Developed 
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Form;
