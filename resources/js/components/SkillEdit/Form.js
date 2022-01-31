import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Edit skill:</p>

                {/* Skill short name */}
                <div className="mb-3">
                    <label htmlFor="skill_short_name" className="form-label">
                        Short name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="skill_short_name"
                        name="skill_short_name"
                        placeholder="Problem-solving"
                        defaultValue={originalShortName}
                    />
                </div>

                {/* Skill statement */}
                <div className="mb-3">
                    <label htmlFor="skill_statement" className="form-label">
                        Statement
                    </label>
                    <textarea
                        className="form-control"
                        id="skill_statement"
                        name="skill_statement"
                        rows="2"
                        placeholder="Resolve a work-related problem to optimally meet the needs of the business"
                        defaultValue={originalStatement}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Form;
