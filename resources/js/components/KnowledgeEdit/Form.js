import React from "react";

const Form = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <p className="fs-4 text-center">Edit Knowledge:</p>

                {/* Knowledge short name */}
                <div className="mb-3">
                    <label htmlFor="knowledge_short_name" className="form-label">
                        Short name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="knowledge_short_name"
                        name="knowledge_short_name"
                        placeholder="Problem-solving"
                        defaultValue={originalShortName}
                    />
                </div>

                {/* Knowledge statement */}
                <div className="mb-3">
                    <label htmlFor="knowledge_statement" className="form-label">
                        Statement
                    </label>
                    <textarea
                        className="form-control"
                        id="knowledge_statement"
                        name="knowledge_statement"
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
