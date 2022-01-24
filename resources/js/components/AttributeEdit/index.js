import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";

import Form from "./Form";
import CompetencyAccordion from "./CompetencyAccordion";

const AttributeEditView = () => {

    // States
    const [competencies, setCompetencies] = useState([]);
    const [selectedCompetencies, setSelectedCompetencies] = useState([]);

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
        const { data: dataCom } = await axios.get("/competencies", {
            headers: {
                Accept: "application/json",
            },
        });

        // Data from Blade for competency
        if (typeof originalRelatedCompetencies === "string") {   
            originalRelatedCompetencies = JSON.parse(
                originalRelatedCompetencies.replaceAll("&quot;", '"')
            );
            setSelectedCompetencies(originalRelatedCompetencies);

            // Remove the original selected competencies from the competencies list
            let competencies = dataCom?.competencies ?? [];
            for (let i = 0; i < competencies.length; ++i) {
                for (let j = 0; j < originalRelatedCompetencies.length; ++j) {
                    if (competencies[i].id === originalRelatedCompetencies[j].id) {
                        competencies.splice(i, 1);
                    }
                }
            }
            setCompetencies(competencies);
        }

        //console.log(originalRelatedCourses);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#attributeEditForm");

         // get the selected competencies to update
         selectedCompetencies.forEach((competency) => {
            const input = document.createElement("input");
            input.setAttribute("name", "competencies[]");
            input.value = competency?.id;
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
            document.querySelector("#competenciesForm"),
            document.querySelector("#selectedCompetenciesPanel")
            
        );
    }, [competencies]);

    return (
        <div className="container py-4">
            <Form />

            {/* Accordion section */}
            <div className="accordion my-3">
                {/* Add Competencies section */}
                <CompetencyAccordion
                    competencies={competencies}
                    setCompetencies={setCompetencies}
                    selectedCompetencies={selectedCompetencies}
                    setSelectedCompetencies={setSelectedCompetencies}
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
                    Edit
                </button>
            </div>
        </div>
    );

};

export default AttributeEditView;

if (document.getElementById("attributes-edit-view")) {
    ReactDOM.render(
        <AttributeEditView />,
        document.getElementById("attributes-edit-view")
    );
}
