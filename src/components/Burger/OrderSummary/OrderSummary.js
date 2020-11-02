import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingrediantsSummary = Object.keys(props.ingrediants).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
                {props.ingrediants[igKey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingrediants</p>
            <ul>{ingrediantsSummary}</ul>
            <p>Continue to Checkout?</p>
            <Button btnTyp="Danger" clicked={props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button btnTyp="Success" clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;
