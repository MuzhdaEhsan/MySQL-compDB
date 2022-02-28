import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";

import Form from "./Form";
import SkillAccordion from "./SkillAccordion";
import AttributeAccordion from "./AttributeAccordion";
import KnowledgeAccordion from "./KnowledgeAccordion";
import CourseAccordion from "./CourseAccordion";

const CompetenciesEditView = () => {
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

        // Data from Blade for skill
        if (typeof originalRelatedSkills === "string") {   
            originalRelatedSkills = JSON.parse(
                originalRelatedSkills.replaceAll("&quot;", '"')
            );
            setSelectedSkills(originalRelatedSkills);

            // Remove the original selected skills from the skills list
            let skills = dataSkill?.skills ?? [];
            for (let i = 0; i < skills.length; ++i) {
                for (let j = 0; j < originalRelatedSkills.length; ++j) {
                    if (skills[i].id === originalRelatedSkills[j].id) {
                        skills.splice(i, 1);
                    }
                }
            }
            setSkills(skills);
        }

        // Data from Blade for attribute
        if (typeof originalRelatedAttributes === "string") {
            
            originalRelatedAttributes = JSON.parse(
                originalRelatedAttributes.replaceAll("&quot;", '"')
            );
            setSelectedAttributes(originalRelatedAttributes);

            // Remove the original selected attributes from the attributes list
            let attributes = dataAtt?.attributes ?? [];
            for (let i = 0; i < attributes.length; ++i) {
                for (let j = 0; j < originalRelatedAttributes.length; ++j) {
                    if (attributes[i].id === originalRelatedAttributes[j].id) {
                        attributes.splice(i, 1);
                    }
                }
            }
            setAttributes(attributes);
        }

        // Data from Blade for knowledge
        if (typeof originalRelatedKnowledge === "string") {
            
            originalRelatedKnowledge = JSON.parse(
                originalRelatedKnowledge.replaceAll("&quot;", '"')
            );
            setSelectedKnowledge(originalRelatedKnowledge);

            // Remove the original selected knowledge from the knowledge list
            let aKnowledge = dataKnow?.aKnowledge ?? [];
            for (let i = 0; i < aKnowledge.length; ++i) {
                for (let j = 0; j < originalRelatedKnowledge.length; ++j) {
                    if (aKnowledge[i].id === originalRelatedKnowledge[j].id) {
                        aKnowledge.splice(i, 1);
                    }
                }
            }
            setKnowledge(aKnowledge);
        }

        //console.log(originalRelatedCourses);
        // Data from Blade for course
        if (typeof originalRelatedCourses === "string") {   
            originalRelatedCourses = JSON.parse(
                originalRelatedCourses.replaceAll("&quot;", '"')
            );
            setSelectedCourses(originalRelatedCourses);

            // Remove the original selected courses from the courses list
            let courses = dataCourse?.courses ?? [];
            for (let i = 0; i < courses.length; ++i) {
                for (let j = 0; j < originalRelatedCourses.length; ++j) {
                    if (courses[i].id === originalRelatedCourses[j].id) {
                        courses.splice(i, 1);
                    }
                }
            }
            setCourses(courses);
        }
    };

    const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#competencyEditForm");

        // get the selected skills to update
        selectedSkills.forEach((skill) => {
            const input = document.createElement("input");
            input.setAttribute("name", "skills[]");
            input.value = skill?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected attributes to update
        selectedAttributes.forEach((attribute) => {
            const input = document.createElement("input");
            input.setAttribute("name", "attributes[]");
            input.value = attribute?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected knowledge to update
        selectedKnowledge.forEach((knowledge) => {
            const input = document.createElement("input");
            input.setAttribute("name", "aKnowledge[]");
            input.value = knowledge?.id;
            input.classList.add("d-none");
            form.appendChild(input);
        });

        // get the selected courses to update
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
    }, [skills],[attributes],[aKnowledge],[courses]);

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
                {/* Add attributes section */}
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
                {/* Add knowledge section */}
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
                {/* Add course section */}
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
                        Update
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
};

export default CompetenciesEditView;

if (document.getElementById("competencies-edit-view")) {
    ReactDOM.render(
        <CompetenciesEditView />,
        document.getElementById("competencies-edit-view")
    );
}
