import React, { useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const SkillModal = ({ addItem, setSkills, setSelectedSkills }) => {
    // States
    const [skillShortName, setSkillShortName] = useState("");
    const [skillStatement, setSkillStatement] = useState("");

    // Helper methods
    const saveSkill = async () => {
        try {
            if (!skillShortName) return;

            const { data } = await axios.post("/skills", {
                skill_short_name: skillShortName,
                skill_statement: skillStatement,
            });

            addItem(data?.skill, setSkills, setSelectedSkills);

            // Clear inputs and hide the modal
            setSkillShortName("");
            setSkillStatement("");
            Modal.getInstance(
                document.getElementById("createNewSkillModal")
            ).hide();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade"
            id="createNewSkillModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* Modal title */}
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add a new Skill
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
                        {/* Skill short name */}
                        <div className="mb-3">
                            <label
                                htmlFor="skill_short_name"
                                className="form-label"
                            >
                                Short name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="skill_short_name"
                                name="skill_short_name"
                                value={skillShortName}
                                onChange={(event) =>
                                    setSkillShortName(event.target.value)
                                }
                            />
                        </div>

                        {/* Skill statement */}
                        <div className="mb-3">
                            <label
                                htmlFor="skill_statement"
                                className="form-label"
                            >
                                Statement
                            </label>
                            <textarea
                                className="form-control"
                                id="skill_statement"
                                name="skill_statement"
                                rows="2"
                                value={skillStatement}
                                onChange={(event) =>
                                    setSkillStatement(event.target.value)
                                }
                            ></textarea>
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
                            onClick={saveSkill}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillModal;
