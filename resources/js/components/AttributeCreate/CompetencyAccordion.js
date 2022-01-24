import React, { useState, useEffect } from "react";
import axios from "axios";



const ITEMS_PER_PAGE = 8;

const CompetencyAccordion = ({
    competencies,
    setCompetencies,
    selectedCompetencies,
    setSelectedCompetencies,
    changePage,
    addItem,
    removeItem,
}) => {
    // States
    const [competencyPage, setCompetencyPage] = useState(1);
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
                    type: "competencies",
                    limit: ITEMS_PER_PAGE,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="competencySelectionHeader">
                {/* Accordion text */}
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#competencySelectionBody"
                    aria-expanded="true"
                    aria-controls="competencySelectionBody"
                >
                    Add Competencies
                </button>
            </h2>
            <div
                id="competencySelectionBody"
                className="accordion-collapse collapse show"
                aria-labelledby="competencySelectionHeader"
            >
                <div className="accordion-body">

                    <div className="row border">
                        <div className="col-md-8 border-end">
                            <div id="competenciesForm">
                                {/* Search bar and add new competency button */}
                                <div className="row justify-content-between mt-2">
                                    {/* Search bar */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for a competency"
                                            value={keyword}
                                            onChange={(event) =>
                                                setKeyword(event.target.value)
                                            }
                                        />
                                    </div>
                                    
                                </div>

                                {/* Competencies list */}
                                {keyword.length === 0
                                    ? competencies
                                          .slice(
                                              (competencyPage - 1) * ITEMS_PER_PAGE,
                                              (competencyPage - 1) * ITEMS_PER_PAGE +
                                                  ITEMS_PER_PAGE
                                          )
                                          .map((competency) => (
                                              <div
                                                  key={competency.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
                                                  {/* Add button */}
                                                  <div className="me-3">
                                                      <button
                                                          type="button"
                                                          className="btn btn-xs btn-success"
                                                          onClick={() =>
                                                              addItem(
                                                                  competency,
                                                                  setCompetencies,
                                                                  setSelectedCompetencies
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-plus-circle"></i>
                                                      </button>
                                                  </div>
                                                  {/* Competency information */}
                                                  <p>
                                                      {competency?.code} -{" "}
                                                      {competency?.short_name} <br />
                                                      {competency?.statement}
                                                  </p>
                                              </div>
                                          ))
                                    : searchResult.map((competency) => (
                                          <div
                                              key={competency.id}
                                              className="d-flex align-items-center border-bottom my-3"
                                          >
                                              {/* Add button */}
                                              <div className="me-3">
                                                  <button
                                                      type="button"
                                                      className="btn btn-xs btn-success"
                                                      onClick={() =>
                                                          addItem(
                                                              competency,
                                                              setCompetencies,
                                                              setSelectedCompetencies
                                                          )
                                                      }
                                                  >
                                                      <i className="fas fa-plus-circle"></i>
                                                  </button>
                                              </div>
                                              {/* Highlighted search result from API */}
                                              <p
                                                  dangerouslySetInnerHTML={{
                                                      __html: competency.highlight,
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
                                                        competencyPage === 1 ||
                                                        competencies.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setCompetencyPage(
                                                                competencyPage - 1
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a className="page-link">
                                                        {competencyPage}
                                                    </a>
                                                </li>
                                                <li
                                                    className={`page-item ${
                                                        competencyPage ===
                                                            Math.ceil(
                                                                competencies.length /
                                                                    ITEMS_PER_PAGE
                                                            ) ||
                                                        competencies.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setCompetencyPage(
                                                                competencyPage + 1
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
                                                        id="competenciesPageInput"
                                                    />

                                                    {/* Go to button */}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                document.querySelector(
                                                                    "#competenciesPageInput"
                                                                ),
                                                                setCompetencyPage
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
                                                        competencies.length /
                                                            ITEMS_PER_PAGE
                                                    )}{" "}
                                                    pages ({competencies.length}{" "}
                                                    items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected competencies panel */}
                        <div
                            id="selectedCompetenciesPanel"
                            className="col-md-4 overflow-auto"
                        >
                            {selectedCompetencies.map((competency) => (
                                <div
                                    key={competency.id}
                                    className="d-flex align-items-center border-bottom my-3"
                                >
                                    {/* Remove button */}
                                    <div className="me-3">
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-danger"
                                            onClick={() =>
                                                removeItem(
                                                    competency,
                                                    setCompetencies,
                                                    setSelectedCompetencies
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>

                                    {/* Selected competency information */}
                                    <p>
                                        {competency?.code} - {competency?.short_name}
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

export default CompetencyAccordion;
