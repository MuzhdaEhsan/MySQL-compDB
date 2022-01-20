import React from "react";
import ReactDOM from "react-dom";

const AttributesCreateView = () => {
    return <div>this is attributes create view</div>;
};

export default AttributesCreateView;

if (document.getElementById("attributes-create-view")) {
    ReactDOM.render(
        <AttributesCreateView />,
        document.getElementById("attributes-create-view")
    );
}
