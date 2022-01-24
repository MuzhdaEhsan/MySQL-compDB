import React, { useState, useEffect } from "react";
import axios from "axios";

import CourseModal from "./CourseModal";

const ITEMS_PER_PAGE = 8;

const CourseAccordion = ({
    courses,
    setCourses,
    selectedCourses,
    setSelectedCourses,
    changePage,
    addItem,
    removeItem,
}) => {
    // States
    const [coursePage, setCoursePage] = useState(1);
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
                    type: "courses",
                    limit: ITEMS_PER_PAGE,
                },
            });

            setSearchResult(data?.data ?? []);
        };

        prepare();
    }, [keyword]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="courseSelectionHeader">
                {/* Accordion text */}
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#courseSelectionBody"
                    aria-expanded="true"
                    aria-controls="courseSelectionBody"
                >
                    Add Courses
                </button>
            </h2>
            <div
                id="courseSelectionBody"
                className="accordion-collapse collapse show"
                aria-labelledby="courseSelectionHeader"
            >
                <div className="accordion-body">
                    <CourseModal
                        setCourses={setCourses}
                        setSelectedCourses={setSelectedCourses}
                        addItem={addItem}
                    />

                    <div className="row border">
                        <div className="col-md-8 border-end">
                            <div id="coursesForm">
                                {/* Search bar and add new course button */}
                                <div className="row justify-content-between mt-2">
                                    {/* Search bar */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for a course"
                                            value={keyword}
                                            onChange={(event) =>
                                                setKeyword(event.target.value)
                                            }
                                        />
                                    </div>
                                    {/* Add new course button */}
                                    <div className="col-md-4">
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-auto d-flex"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createNewCourseModal"
                                        >
                                            Add a new course
                                        </button>
                                    </div>
                                </div>

                                {/* Course list */}
                                {keyword.length === 0
                                    ? courses
                                          .slice(
                                              (coursePage - 1) * ITEMS_PER_PAGE,
                                              (coursePage - 1) * ITEMS_PER_PAGE +
                                                  ITEMS_PER_PAGE
                                          )
                                          .map((course) => (
                                              <div
                                                  key={course.id}
                                                  className="d-flex align-items-center border-bottom my-3"
                                              >
                                                  {/* Add button */}
                                                  <div className="me-3">
                                                      <button
                                                          type="button"
                                                          className="btn btn-xs btn-success"
                                                          onClick={() =>
                                                              addItem(
                                                                  course,
                                                                  setCourses,
                                                                  setSelectedCourses
                                                              )
                                                          }
                                                      >
                                                          <i className="fas fa-plus-circle"></i>
                                                      </button>
                                                  </div>
                                                  {/* Course information */}
                                                  <p>
                                                      {course?.code} -{" "}
                                                      {course?.full_name} <br />
                                                  </p>
                                              </div>
                                          ))
                                    : searchResult.map((course) => (
                                          <div
                                              key={course.id}
                                              className="d-flex align-items-center border-bottom my-3"
                                          >
                                              {/* Add button */}
                                              <div className="me-3">
                                                  <button
                                                      type="button"
                                                      className="btn btn-xs btn-success"
                                                      onClick={() =>
                                                          addItem(
                                                              course,
                                                              setCourses,
                                                              setSelectedCourses
                                                          )
                                                      }
                                                  >
                                                      <i className="fas fa-plus-circle"></i>
                                                  </button>
                                              </div>
                                              {/* Highlighted search result from API */}
                                              <p
                                                  dangerouslySetInnerHTML={{
                                                      __html: course.highlight,
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
                                                        coursePage === 1 ||
                                                        courses.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setCoursePage(
                                                                coursePage - 1
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a className="page-link">
                                                        {coursePage}
                                                    </a>
                                                </li>
                                                <li
                                                    className={`page-item ${
                                                        coursePage ===
                                                            Math.ceil(
                                                                courses.length /
                                                                    ITEMS_PER_PAGE
                                                            ) ||
                                                        courses.length === 0
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        onClick={() =>
                                                            setCoursePage(
                                                                coursePage + 1
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
                                                        id="coursesPageInput"
                                                    />

                                                    {/* Go to button */}
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                document.querySelector(
                                                                    "#coursesPageInput"
                                                                ),
                                                                setCoursePage
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
                                                        courses.length /
                                                            ITEMS_PER_PAGE
                                                    )}{" "}
                                                    pages ({courses.length}{" "}
                                                    items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected courses panel */}
                        <div
                            id="selectedCoursesPanel"
                            className="col-md-4 overflow-auto"
                        >
                            {selectedCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="d-flex align-items-center border-bottom my-3"
                                >
                                    {/* Remove button */}
                                    <div className="me-3">
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-danger"
                                            onClick={() =>
                                                removeItem(
                                                    course,
                                                    setCourses,
                                                    setSelectedCourses
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </button>
                                    </div>

                                    {/* Selected course information */}
                                    <p>
                                        {course?.code} - {course?.full_name}
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

export default CourseAccordion;
