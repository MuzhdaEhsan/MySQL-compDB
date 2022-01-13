import React from "react";
import ReactDOM from "react-dom";

const SkillsCreateView = () => {
    return <div>this is skills create view</div>;
};

export default SkillsCreateView;

if (document.getElementById("skills-create-view")) {
    ReactDOM.render(
        <SkillsCreateView />,
        document.getElementById("skills-create-view")
    );
}
