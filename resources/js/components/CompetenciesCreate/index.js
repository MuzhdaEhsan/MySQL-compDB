import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";

import Form from "./Form";
import SkillAccordion from "./SkillAccordion";

function CompetenciesCreateView() {
    // States
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    // Helper methods
    const setFormsHeight = (mainPanel, selectedItemsPanel) => {
        // We set the height of the selected items panel to be equal to the height
        // of the main form because if there are too many selected items, we don't
        // want to display a long list of it while the main form looks empty
        // We also set the minimum height to be 500 px to avoid the form from being too small
        const minHeight =
            mainPanel.clientHeight >= 500 ? mainPanel.clientHeight : 500;
        selectedItemsPanel.setAttribute("style", `height: ${minHeight}px`);
    };

    const changePage = (input, setPage) => {
        if (isNumber(+input.value)) {
            setPage(+input.value);
        }
    };

    const addItem = (toBeAddedItem, setItems, setSelectedItems) => {
        // When adding new item, we remove that item from the item list
        setItems((items) => {
            const index = items.findIndex(
                (item) => item.id === toBeAddedItem.id
            );
            items.splice(index, 1);
            return [...items];
        });

        // Add that item to the selected items list
        setSelectedItems((selectedItems) => {
            selectedItems.push(toBeAddedItem);
            return [...selectedItems];
        });
    };

    const removeItem = (toBeRemovedItem, setItems, setSelectedItems) => {
        // When removing an item, we remove that item from the selected items list
        setSelectedItems((selectedItems) => {
            const index = selectedItems.findIndex(
                (item) => item.id === toBeRemovedItem.id
            );
            selectedItems.splice(index, 1);
            return [...selectedItems];
        });

        // Add that item to the items list
        setItems((items) => {
            items.push(toBeRemovedItem);
            return [...items];
        });
    };

    const fetchOriginalData = async () => {
        const { data } = await axios.get("/skills", {
            headers: {
                Accept: "application/json",
            },
        });

        setSkills(data?.skills ?? []);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#competencyCreateForm");

        selectedSkills.forEach((skill) => {
            const input = document.createElement("input");
            input.setAttribute("name", "skills[]");
            input.value = skill?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        form.submit();
    };

    // Side effects
    useEffect(() => {
        const prepare = async () => {
            await fetchOriginalData();
            setFormsHeight(
                document.querySelector("#skillsForm"),
                document.querySelector("#selectedSkillsPanel")
            );
        };

        prepare();
    }, []);

    useEffect(() => {
        setFormsHeight(
            document.querySelector("#skillsForm"),
            document.querySelector("#selectedSkillsPanel")
        );
    }, [skills]);

    return (
        <div className="container py-4">
            <Form />

            {/* Accordion section */}
            <div className="accordion my-3">
                {/* Add Skills section */}
                <SkillAccordion
                    skills={skills}
                    setSkills={setSkills}
                    selectedSkills={selectedSkills}
                    setSelectedSkills={setSelectedSkills}
                    changePage={changePage}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            </div>

            {/* Submit button  */}
            <div className="d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitForm}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default CompetenciesCreateView;

if (document.getElementById("competencies-create-view")) {
    ReactDOM.render(
        <CompetenciesCreateView />,
        document.getElementById("competencies-create-view")
    );
}
