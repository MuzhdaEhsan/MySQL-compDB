import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";

import Form from "./Form";
import SkillAccordion from "./SkillAccordion";
import AttributeAccordion from "./AttributeAccordion";
import KnowledgeAccordion from "./KnowledgeAccordion";
import CourseAccordion from "./CourseAccordion";

function CompetenciesCreateView() {
    // States
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const [aKnowledge, setKnowledge] = useState([]);
    const [selectedKnowledge, setSelectedKnowledge] = useState([]);

    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);


    // Helper methods
    const setFormHeight = (mainPanel, selectedItemsPanel) => {
        // We set the height of the selected items panel to be equal to the height
        // of the main form because if there are too many selected items, we don't
        // want to display a long list of it while the main form looks empty
        // We also set the minimum height to be 300 px to avoid the form from being too small
        const minHeight =
            mainPanel.clientHeight >= 300 ? mainPanel.clientHeight : 300;
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

            // In case we add a new item by creating a new one using modal
            // The index would return -1 because the object isn't in the current items list
            if (index === -1) return items;

            items.splice(index, 1);
            // Return a new array to trigger rerendering
            return [...items];
        });

        // Add that item to the selected items list
        setSelectedItems((selectedItems) => {
            selectedItems.push(toBeAddedItem);
            // Return a new array to trigger rerendering
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
            // Return a new array to trigger rerendering
            return [...selectedItems];
        });

        // Add that item to the items list
        setItems((items) => {
            items.push(toBeRemovedItem);
            // Return a new array to trigger rerendering
            return [...items];
        });
    };

    const fetchOriginalData = async () => {
        const { data: dataSkill } = await axios.get("/skills", {
            headers: {
                Accept: "application/json",
            },
        });

        const { data: dataAtt } = await axios.get("/attributes", {
            headers: {
                Accept: "application/json",
            },
        });

        const { data: dataKnow } = await axios.get("/knowledge", {
            headers: {
                Accept: "application/json",
            },
        });

        const { data: dataCourse } = await axios.get("/courses", {
            headers: {
                Accept: "application/json",
            },
        });
        
        setSkills(dataSkill?.skills ?? []);
        setAttributes(dataAtt?.attributes ?? []);
        setKnowledge(dataKnow?.aKnowledge ?? []);
        setCourses(dataCourse?.courses ?? []);
        
    };

    const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };
    
    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#competencyCreateForm");

        // get the selected skills to add 
        selectedSkills.forEach((skill) => {
            const input = document.createElement("input");
            input.setAttribute("name", "skills[]");
            input.value = skill?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected attributes to add 
        selectedAttributes.forEach((attribute) => {
            const input = document.createElement("input");
            input.setAttribute("name", "attributes[]");
            input.value = attribute?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected knowledge to add 
        selectedKnowledge.forEach((knowledge) => {
            const input = document.createElement("input");
            input.setAttribute("name", "aKnowledge[]");
            input.value = knowledge?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected courses to add 
        selectedCourses.forEach((course) => {
            const input = document.createElement("input");
            input.setAttribute("name", "courses[]");
            input.value = course?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        form.submit();
    };

    // Side effects
    useEffect(() => {
        fetchOriginalData();
    }, []);
    
    useEffect(() => {
        setFormHeight(
            document.querySelector("#skillsForm"),
            document.querySelector("#selectedSkillsPanel"),

            document.querySelector("#attributesForm"),
            document.querySelector("#selectedAttributesPanel"),

            document.querySelector("#knowledgeForm"),
            document.querySelector("#selectedKnowledgePanel"),

            document.querySelector("#coursesForm"),
            document.querySelector("#selectedCoursesPanel")
        );
    }, [skills], [attributes], [aKnowledge],[courses]);

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
            <div className="accordion my-3">
                {/* Add Attributes section */}
                <AttributeAccordion
                    attributes={attributes}
                    setAttributes={setAttributes}
                    selectedAttributes={selectedAttributes}
                    setSelectedAttributes={setSelectedAttributes}
                    changePage={changePage}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            </div>

            <div className="accordion my-3">
                {/* Add Knowledge section */}
                <KnowledgeAccordion
                    aKnowledge={aKnowledge}
                    setKnowledge={setKnowledge}
                    selectedKnowledge={selectedKnowledge}
                    setSelectedKnowledge={setSelectedKnowledge}
                    changePage={changePage}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            </div>
            <div className="accordion my-3">
                {/* Add Knowledge section */}
                <CourseAccordion
                    courses={courses}
                    setCourses={setCourses}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    changePage={changePage}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            </div>   

            {/* Submit button  */}
            <div className="d-flex justify-content-center">
                
                <div className="col-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitForm}
                    >
                        Create
                    </button>
                </div>
                <div className="col-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={cancelForm}
                    >
                        Cancel
                    </button>
                </div>
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
