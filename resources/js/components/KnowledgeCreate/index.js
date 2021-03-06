import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNumber } from "lodash";

import Form from "./Form";
import CompetencyAccordion from "./CompetencyAccordion";

const KnowledgeCreateView = () => {

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
        
        setCompetencies(dataCom?.competencies ?? []);
    };

    const cancelForm = (event) => {
        event.preventDefault();
        history.back();
    };

    const submitForm = (event) => {
        event.preventDefault();

        const form = document.querySelector("#knowledgeCreateForm");

        // get the selected competencies to add 
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
};

export default KnowledgeCreateView;

if (document.getElementById("knowledge-create-view")) {
    ReactDOM.render(
        <KnowledgeCreateView />,
        document.getElementById("knowledge-create-view")
    );
}
