import React, { useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const AttributeModal = ({ addItem, setAttributes, setSelectedAttributes }) => {
    // States
    const [attributeShortName, setAttributeShortName] = useState("");
    const [attributeStatement, setAttributeStatement] = useState("");

    // Helper methods
    const saveAttribute = async () => {
        try {
            if (!attributeShortName) return;

            const { data } = await axios.post("/attributes", {
                attribute_short_name: attributeShortName,
                attribute_statement: attributeStatement,
            });

            addItem(data?.attribute, setAttributes, setSelectedAttributes);

            // Clear inputs and hide the modal
            setAttributeShortName("");
            setAttributeStatement("");
            Modal.getInstance(
                document.getElementById("createNewAttributeModal")
            ).hide();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="modal fade"
            id="createNewAttributeModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* Modal title */}
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add a new Attribute
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
                        {/* Attribute short name */}
                        <div className="mb-3">
                            <label
                                htmlFor="attribute_short_name"
                                className="form-label"
                            >
                                Short name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="attribute_short_name"
                                name="attribute_short_name"
                                value={attributeShortName}
                                onChange={(event) =>
                                    setAttributeShortName(event.target.value)
                                }
                            />
                        </div>

                        {/* Attribute statement */}
                        <div className="mb-3">
                            <label
                                htmlFor="attribute_statement"
                                className="form-label"
                            >
                                Statement
                            </label>
                            <textarea
                                className="form-control"
                                id="attribute_statement"
                                name="attribute_statement"
                                rows="2"
                                value={attributeStatement}
                                onChange={(event) =>
                                    setAttributeStatement(event.target.value)
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
                            onClick={saveAttribute}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeModal;
