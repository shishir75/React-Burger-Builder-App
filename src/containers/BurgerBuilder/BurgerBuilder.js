import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

export class BurgerBuilder extends Component {
    state = {
        ingrediants: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
    };

    render() {
        return (
            <Aux>
                <Burger ingrediants={this.state.ingrediants} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
