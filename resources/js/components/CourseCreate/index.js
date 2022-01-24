import React from "react";
import ReactDOM from "react-dom";

const CoursesCreateView = () => {
    return <div>this is courses create view</div>;
};

export default CoursesCreateView;

if (document.getElementById("courses-create-view")) {
    ReactDOM.render(
        <CoursesCreateView />,
        document.getElementById("courses-create-view")
    );
}
