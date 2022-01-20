import React from "react";
import ReactDOM from "react-dom";

const KnowledgeCreateView = () => {
    return <div>this is knowledge create view</div>;
};

export default KnowledgeCreateView;

if (document.getElementById("knowledge-create-view")) {
    ReactDOM.render(
        <KnowledgeCreateView />,
        document.getElementById("knowledge-create-view")
    );
}
