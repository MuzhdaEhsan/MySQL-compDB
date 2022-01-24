import React, { useState, useEffect } from "react";
import axios from "axios";

import KnowledgeModal from "./KnowledgeModal";

const ITEMS_PER_PAGE = 8;

const KnowledgeAccordion = ({
    aKnowledge,
    setKnowledge,
    selectedKnowledge,
    setSelectedKnowledge,
    changePage,
    addItem,
    removeItem,
}) => {
    // States
    const [knowledgePage, setKnowledgePage] = useState(1);
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
                    type: "aKnowledge",
                    limit: ITEMS_PER_PAGE,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="knowledgeSelectionHeader">
                {/* Accordion text */}
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#knowledgeSelectionBody"
                    aria-expanded="true"
                    aria-controls="knowledgeSelectionBody"
                >
                    Add Knowledge
                </button>
            </h2>
            <div
                id="knowledgeSelectionBody"
                className="accordion-collapse collapse show"
                aria-labelledby="knowledgeSelectionHeader"
            >
                <div className="accordion-body">
                    <KnowledgeModal
                        setKnowledge={setKnowledge}
                        setSelectedKnowledge={setSelectedKnowledge}
                        addItem={addItem}
                    />

                    <div className="row border">
                        <div className="col-md-8 border-end">
                            <div id="knowledgeForm">
                                {/* Search bar and add new knowledge button */}
                                <div className="row justify-content-between mt-2">
                                    {/* Search bar */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for a knowledge"
                                            value={keyword}
                                            onChange={(event) =>
                                                setKeyword(event.target.value)
                                            }
                                        />
                                    </div>
                                    {/* Add new knowledge button */}
                                    <div className="col-md-4">
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-auto d-flex"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createNewKnowledgeModal"
                                        >
                                            Add a new knowledge
                                        </button>
                                    </div>
                                </div>

                                {/* Knowledge list */}
                                {keyword.length === 0
                                    ? aKnowledge
                                          .slice(
                                              (knowledgePage - 1) * ITEMS_PER_PAGE,
                                              (knowledgePage - 1) * ITEMS_PER_PAGE +
                                                  ITEMS_PER_PAGE
                                          )
                                          .map((knowledge) => (
                                              <div
                                                  key={knowledge.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
                                                  {/* Add button */}
                                                  <div className="me-3">
                                                      <button
                                                          type="button"
                                                          className="btn btn-xs btn-success"
                                                          onClick={() =>
                                                              addItem(
                                                                  knowledge,
                                                                  setKnowledge,
                                                                  setSelectedKnowledge
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-plus-circle"></i>
                                                      </button>
                                                  </div>
                                                  {/* Knowledge information */}
                                                  <p>
                                                      {knowledge?.code} -{" "}
                                                      {knowledge?.short_name} <br />
                                                      {knowledge?.statement}
                                                  </p>
                                              </div>
                                          ))
                                    : searchResult.map((knowledge) => (
                                          <div
                                              key={knowledge.id}
                                              className="d-flex align-items-center border-bottom my-3"
                                          >
                                              {/* Add button */}
                                              <div className="me-3">
                                                  <button
                                                      type="button"
                                                      className="btn btn-xs btn-success"
                                                      onClick={() =>
                                                          addItem(
                                                              knowledge,
                                                              setKnowledge,
                                                              setSelectedKnowledge
                                                          )
                                                      }
                                                  >
                                                      <i className="fas fa-plus-circle"></i>
                                                  </button>
                                              </div>
                                              {/* Highlighted search result from API */}
                                              <p
                                                  dangerouslySetInnerHTML={{
                                                      __html: knowledge.highlight,
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
                                                        knowledgePage === 1 ||
                                                        aKnowledge.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setKnowledgePage(
                                                                knowledgePage - 1
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a className="page-link">
                                                        {knowledgePage}
                                                    </a>
                                                </li>
                                                <li
                                                    className={`page-item ${
                                                        knowledgePage ===
                                                            Math.ceil(
                                                                aKnowledge.length /
                                                                    ITEMS_PER_PAGE
                                                            ) ||
                                                        aKnowledge.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setKnowledgePage(
                                                                knowledgePage + 1
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
                                                        id="knowledgePageInput"
                                                    />

                                                    {/* Go to button */}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                document.querySelector(
                                                                    "#knowledgePageInput"
                                                                ),
                                                                setKnowledgePage
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
                                                        aKnowledge.length /
                                                            ITEMS_PER_PAGE
                                                    )}{" "}
                                                    pages ({aKnowledge.length}{" "}
                                                    items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected knowledge panel */}
                        <div
                            id="selectedKnowledgePanel"
                            className="col-md-4 overflow-auto"
                        >
                            {selectedKnowledge.map((knowledge) => (
                                <div
                                    key={knowledge.id}
                                    className="d-flex align-items-center border-bottom my-3"
                                >
                                    {/* Remove button */}
                                    <div className="me-3">
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-danger"
                                            onClick={() =>
                                                removeItem(
                                                    knowledge,
                                                    setKnowledge,
                                                    setSelectedKnowledge
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>

                                    {/* Selected knowledge information */}
                                    <p>
                                        {knowledge?.code} - {knowledge?.short_name}
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

export default KnowledgeAccordion;
