import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((ctrl) => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingrediantAdded(ctrl.type)}
                removed={() => props.ingrediantRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
    </div>
);

export default BuildControls;
