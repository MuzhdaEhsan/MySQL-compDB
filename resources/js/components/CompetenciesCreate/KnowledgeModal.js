import React, { useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const KnowledgeModal = ({ addItem, setKnowledge, setSelectedKnowledge }) => {
    // States
    const [knowledgeShortName, setKnowledgeShortName] = useState("");
    const [knowledgeStatement, setKnowledgeStatement] = useState("");

    // Helper methods
    const saveKnowledge = async () => {
        try {
            if (!knowledgeShortName) return;

            const { data } = await axios.post("/knowledge", {
                knowledge_short_name: knowledgeShortName,
                knowledge_statement: knowledgeStatement,
            });

            addItem(data?.knowledge, setKnowledge, setSelectedKnowledge);

            // Clear inputs and hide the modal
            setKnowledgeShortName("");
            setKnowledgeStatement("");
            Modal.getInstance(
                document.getElementById("createNewKnowledgeModal")
            ).hide();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade"
            id="createNewKnowledgeModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* Modal title */}
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add a new Knowledge
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
                        {/* Knowledge short name */}
                        <div className="mb-3">
                            <label
                                htmlFor="knowledge_short_name"
                                className="form-label"
                            >
                                Short name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="knowledge_short_name"
                                name="knowledge_short_name"
                                value={knowledgeShortName}
                                onChange={(event) =>
                                    setKnowledgeShortName(event.target.value)
                                }
                            />
                        </div>

                        {/* Knowledge statement */}
                        <div className="mb-3">
                            <label
                                htmlFor="knowledge_statement"
                                className="form-label"
                            >
                                Statement
                            </label>
                            <textarea
                                className="form-control"
                                id="knowledge_statement"
                                name="knowledge_statement"
                                rows="2"
                                value={knowledgeStatement}
                                onChange={(event) =>
                                    setKnowledgeStatement(event.target.value)
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
                            onClick={saveKnowledge}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeModal;
