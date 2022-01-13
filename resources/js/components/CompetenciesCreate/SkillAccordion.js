import React, { useState, useEffect } from "react";
import axios from "axios";

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
            if (keyword.length === 0) return;

            const { data } = await axios.get("/stateful-api/search", {
                params: {
                    keyword,
                    type: "skills",
                    limit: 8,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="skillSelectionHeader">
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
                        <div className="row border">
                            <div className="col-md-8 border-end">
                                <div id="skillsForm">
                                    <div className="row justify-content-between mt-2">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search for a skill"
                                                value={keyword}
                                                onChange={(event) =>
                                                    setKeyword(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
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
                                                  (skillPage - 1) * 8,
                                                  (skillPage - 1) * 8 + 8
                                              )
                                              .map((skill) => (
                                                  <div
                                                      key={skill.id}
                                                      className="d-flex align-items-center border-bottom my-3"
                                                  >
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
                                                      <p>
                                                          {skill?.code} -{" "}
                                                          {skill?.short_name}{" "}
                                                          <br />
                                                          {skill?.statement}
                                                      </p>
                                                  </div>
                                              ))
                                        : searchResult.map((skill) => (
                                              <div
                                                  key={skill.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
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
                                                  <p
                                                      dangerouslySetInnerHTML={{
                                                          __html: skill.highlight,
                                                      }}
                                                  ></p>
                                              </div>
                                          ))}

                                    {keyword.length === 0 && (
                                        <div>
                                            {/* Paginator */}
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination">
                                                    <li
                                                        className={`page-item ${
                                                            skillPage === 1
                                                                ? "disabled"
                                                                : ""
                                                        }`}
                                                    >
                                                        <a
                                                            className="page-link"
                                                            onClick={() =>
                                                                setSkillPage(
                                                                    skillPage -
                                                                        1
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
                                                                        8
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
                                                                    skillPage +
                                                                        1
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
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="skillsPageInput"
                                                        />
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
                                                <div className="col-md-6 d-flex align-items-center">
                                                    <p className="fw-bold">
                                                        Total:{" "}
                                                        {Math.ceil(
                                                            skills.length / 8
                                                        )}{" "}
                                                        pages
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                id="selectedSkillsPanel"
                                className="col-md-4 overflow-auto"
                            >
                                {selectedSkills.map((skill, index) => (
                                    <div
                                        key={skill.id}
                                        className="d-flex align-items-center border-bottom my-3"
                                    >
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
            {/* TODO: Work in progress */}
            {/* Modal */}
            <div
                className="modal fade"
                id="createNewSkillModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkillAccordion;
