import React, { useState, useEffect } from "react";
import axios from "axios";

import AttributeModal from "./AttributeModal";

const ITEMS_PER_PAGE = 8;

const AttributeAccordion = ({
    attributes,
    setAttributes,
    selectedAttributes,
    setSelectedAttributes,
    changePage,
    addItem,
    removeItem,
}) => {
    // States
    const [attributePage, setAttributePage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    // Side effects
    useEffect(() => {
        const prepare = async () => {
            if (keyword.length === 0) {
                setSearchResult([]);
                return;
            }

            const { data } = await axios.get("/stateful-api/search", {
                params: {
                    keyword,
                    type: "attributes",
                    limit: ITEMS_PER_PAGE,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="attributeSelectionHeader">
                {/* Accordion text */}
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#attributeSelectionBody"
                    aria-expanded="true"
                    aria-controls="attributeSelectionBody"
                >
                    Add Attributes
                </button>
            </h2>
            <div
                id="attributeSelectionBody"
                className="accordion-collapse collapse show"
                aria-labelledby="attributeSelectionHeader"
            >
                <div className="accordion-body">
                    <AttributeModal
                        setAttributes={setAttributes}
                        setSelectedAttributes={setSelectedAttributes}
                        addItem={addItem}
                    />

                    <div className="row border">
                        <div className="col-md-8 border-end">
                            <div id="attributesForm">
                                {/* Search bar and add new attribute button */}
                                <div className="row justify-content-between mt-2">
                                    {/* Search bar */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for a attribute"
                                            value={keyword}
                                            onChange={(event) =>
                                                setKeyword(event.target.value)
                                            }
                                        />
                                    </div>
                                    {/* Add new attribute button */}
                                    <div className="col-md-4">
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-auto d-flex"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createNewAttributeModal"
                                        >
                                            Add a new attribute
                                        </button>
                                    </div>
                                </div>

                                {/* Attributes list */}
                                {keyword.length === 0
                                    ? attributes
                                          .slice(
                                              (attributePage - 1) * ITEMS_PER_PAGE,
                                              (attributePage - 1) * ITEMS_PER_PAGE +
                                                  ITEMS_PER_PAGE
                                          )
                                          .map((attribute) => (
                                              <div
                                                  key={attribute.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
                                                  {/* Add button */}
                                                  <div className="me-3">
                                                      <button
                                                          type="button"
                                                          className="btn btn-xs btn-success"
                                                          onClick={() =>
                                                              addItem(
                                                                  attribute,
                                                                  setAttributes,
                                                                  setSelectedAttributes
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-plus-circle"></i>
                                                      </button>
                                                  </div>
                                                  {/* Attribute information */}
                                                  <p>
                                                      {attribute?.code} -{" "}
                                                      {attribute?.short_name} <br />
                                                      {attribute?.statement}
                                                  </p>
                                              </div>
                                          ))
                                    : searchResult.map((attribute) => (
                                          <div
                                              key={attribute.id}
                                              className="d-flex align-items-center border-bottom my-3"
                                          >
                                              {/* Add button */}
                                              <div className="me-3">
                                                  <button
                                                      type="button"
                                                      className="btn btn-xs btn-success"
                                                      onClick={() =>
                                                          addItem(
                                                              attribute,
                                                              setAttributes,
                                                              setSelectedAttributes
                                                          )
                                                      }
                                                  >
                                                      <i className="fas fa-plus-circle"></i>
                                                  </button>
                                              </div>
                                              {/* Highlighted search result from API */}
                                              <p
                                                  dangerouslySetInnerHTML={{
                                                      __html: attribute.code + " - " + attribute.short_name + "<br />" + attribute.statement,
                                                  }}
                                              ></p>
                                          </div>
                                      ))}

                                {/* Paginator */}
                                {keyword.length === 0 && (
                                    <div>
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination">
                                                <li
                                                    className={`page-item ${
                                                        attributePage === 1 ||
                                                        attributes.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setAttributePage(
                                                                attributePage - 1
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a className="page-link">
                                                        {attributePage}
                                                    </a>
                                                </li>
                                                <li
                                                    className={`page-item ${
                                                        attributePage ===
                                                            Math.ceil(
                                                                attributes.length /
                                                                    ITEMS_PER_PAGE
                                                            ) ||
                                                            attributes.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setAttributePage(
                                                                attributePage + 1
                                                            )
                                                        }
                                                    >
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>

                                        {/* Paginator control */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    {/* Text input */}
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="attributesPageInput"
                                                    />

                                                    {/* Go to button */}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                document.querySelector(
                                                                    "#attributesPageInput"
                                                                ),
                                                                setAttributePage
                                                            )
                                                        }
                                                    >
                                                        Go to page
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total number of pages */}
                                            <div className="col-md-6 d-flex align-items-center">
                                                <p className="fw-bold">
                                                    Total:{" "}
                                                    {Math.ceil(
                                                        attributes.length /
                                                            ITEMS_PER_PAGE
                                                    )}{" "}
                                                    pages ({attributes.length}{" "}
                                                    items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected attributes panel */}
                        <div
                            id="selectedAttributesPanel"
                            className="col-md-4 overflow-auto"
                        >
                            {selectedAttributes.map((attribute) => (
                                <div
                                    key={attribute.id}
                                    className="d-flex align-items-center border-bottom my-3"
                                >
                                    {/* Remove button */}
                                    <div className="me-3">
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-danger"
                                            onClick={() =>
                                                removeItem(
                                                    attribute,
                                                    setAttributes,
                                                    setSelectedAttributes
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>

                                    {/* Selected attribute information */}
                                    <p>
                                        {attribute?.code} - {attribute?.short_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeAccordion;
