import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIANT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

export class BurgerBuilder extends Component {
    state = {
        ingrediants: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0,
        },
        totalPrice: 4,
    };

    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediants[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediants = { ...this.state.ingrediants };

        updatedIngrediants[type] = updatedCount;

        const priceAddition = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingrediants: updatedIngrediants,
        });
    };

    removeIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediants[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngrediants = { ...this.state.ingrediants };

        updatedIngrediants[type] = updatedCount;

        const priceDeduction = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingrediants: updatedIngrediants,
        });
    };

    render() {
        const disabledInfo = { ...this.state.ingrediants };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, meat:false, cheese: true, bacon: false}

        return (
            <Aux>
                <Burger ingrediants={this.state.ingrediants} />
                <BuildControls
                    ingrediantAdded={this.addIngrediantHandler}
                    ingrediantRemoved={this.removeIngrediantHandler}
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
