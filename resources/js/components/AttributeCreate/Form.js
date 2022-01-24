import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Create a new attribute:</p>

                {/* Attribute short name */}
                <div className="mb-3">
                    <label htmlFor="attribute_short_name" className="form-label">
                        Short name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="attribute_short_name"
                        name="attribute_short_name"
                        placeholder="Problem-solving"
                    />
                </div>

                {/* Attribute statement */}
                <div className="mb-3">
                    <label htmlFor="attribute_statement" className="form-label">
                        Statement
                    </label>
                    <textarea
                        className="form-control"
                        id="attribute_statement"
                        name="attribute_statement"
                        rows="2"
                        placeholder="Resolve a work-related problem to optimally meet the needs of the business"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Form;
