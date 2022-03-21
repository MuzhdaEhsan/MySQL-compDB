import React, { useState, useEffect } from "react";
import axios from "axios";

import SkillModal from "./SkillModal";

const ITEMS_PER_PAGE = 8;

const SkillAccordion = ({
    skills,
    setSkills,
    selectedSkills,
    setSelectedSkills,
    changePage,
    addItem,
    removeItem,
}) => {
    // States
    const [skillPage, setSkillPage] = useState(1);
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
                    type: "skills",
                    limit: ITEMS_PER_PAGE,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="skillSelectionHeader">
                {/* Accordion text */}
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#skillSelectionBody"
                    aria-expanded="true"
                    aria-controls="skillSelectionBody"
                >
                    Add Skills
                </button>
            </h2>
            <div
                id="skillSelectionBody"
                className="accordion-collapse collapse show"
                aria-labelledby="skillSelectionHeader"
            >
                <div className="accordion-body">
                    <SkillModal
                        setSkills={setSkills}
                        setSelectedSkills={setSelectedSkills}
                        addItem={addItem}
                    />

                    <div className="row border">
                        <div className="col-md-8 border-end">
                            <div id="skillsForm">
                                {/* Search bar and add new skill button */}
                                <div className="row justify-content-between mt-2">
                                    {/* Search bar */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for a skill"
                                            value={keyword}
                                            onChange={(event) =>
                                                setKeyword(event.target.value)
                                            }
                                        />
                                    </div>
                                    {/* Add new skill button */}
                                    <div className="col-md-4">
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-auto d-flex"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createNewSkillModal"
                                        >
                                            Add a new skill
                                        </button>
                                    </div>
                                </div>

                                {/* Skills list */}
                                {keyword.length === 0
                                    ? skills
                                          .slice(
                                              (skillPage - 1) * ITEMS_PER_PAGE,
                                              (skillPage - 1) * ITEMS_PER_PAGE +
                                                  ITEMS_PER_PAGE
                                          )
                                          .map((skill) => (
                                              <div
                                                  key={skill.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
                                                  {/* Add button */}
                                                  <div className="me-3">
                                                      <button
                                                          type="button"
                                                          className="btn btn-xs btn-success"
                                                          onClick={() =>
                                                              addItem(
                                                                  skill,
                                                                  setSkills,
                                                                  setSelectedSkills
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-plus-circle"></i>
                                                      </button>
                                                  </div>
                                                  {/* Skill information */}
                                                  <p>
                                                      {skill?.code} -{" "}
                                                      {skill?.short_name} <br />
                                                      {skill?.statement}
                                                  </p>
                                              </div>
                                          ))
                                    : searchResult.map((skill) => (
                                          <div
                                              key={skill.id}
                                              className="d-flex align-items-center border-bottom my-3"
                                          >
                                              {/* Add button */}
                                              <div className="me-3">
                                                  <button
                                                      type="button"
                                                      className="btn btn-xs btn-success"
                                                      onClick={() =>
                                                          addItem(
                                                              skill,
                                                              setSkills,
                                                              setSelectedSkills
                                                          )
                                                      }
                                                  >
                                                      <i className="fas fa-plus-circle"></i>
                                                  </button>
                                              </div>
                                              {/* Highlighted search result from API */}
                                              <p
                                                  dangerouslySetInnerHTML={{
                                                      __html: skill.code + " - " + skill.short_name + "<br />" + skill.statement,
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
                                                        skillPage === 1 ||
                                                        skills.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setSkillPage(
                                                                skillPage - 1
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a className="page-link">
                                                        {skillPage}
                                                    </a>
                                                </li>
                                                <li
                                                    className={`page-item ${
                                                        skillPage ===
                                                            Math.ceil(
                                                                skills.length /
                                                                    ITEMS_PER_PAGE
                                                            ) ||
                                                        skills.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setSkillPage(
                                                                skillPage + 1
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
                                                        id="skillsPageInput"
                                                    />

                                                    {/* Go to button */}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                document.querySelector(
                                                                    "#skillsPageInput"
                                                                ),
                                                                setSkillPage
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
                                                        skills.length /
                                                            ITEMS_PER_PAGE
                                                    )}{" "}
                                                    pages ({skills.length}{" "}
                                                    items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected skills panel */}
                        <div
                            id="selectedSkillsPanel"
                            className="col-md-4 overflow-auto"
                        >
                            {selectedSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="d-flex align-items-center border-bottom my-3"
                                >
                                    {/* Remove button */}
                                    <div className="me-3">
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-danger"
                                            onClick={() =>
                                                removeItem(
                                                    skill,
                                                    setSkills,
                                                    setSelectedSkills
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>

                                    {/* Selected skill information */}
                                    <p>
                                        {skill?.code} - {skill?.short_name}
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

export default SkillAccordion;
