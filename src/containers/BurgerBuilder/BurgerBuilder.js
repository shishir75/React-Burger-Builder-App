import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIANT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

export class BurgerBuilder extends Component {
    state = {
        ingrediants: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios
            .get(
                "https://react-burger-builder-a521c.firebaseio.com/ingrediants.json"
            )
            .then((response) => {
                this.setState({ ingrediants: response.data });
            })
            .catch((error) => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingrediants) {
        const sum = Object.keys(ingrediants)
            .map((igKey) => {
                return ingrediants[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchaseable: sum > 0 });
    }

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
        this.updatePurchaseState(updatedIngrediants);
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
        this.updatePurchaseState(updatedIngrediants);
    };

    purchaseHandlader = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // alert("You Continue!");
        this.setState({ loading: true });
        const order = {
            ingrediants: this.state.ingrediants,
            price: this.state.totalPrice,
            customer: {
                name: "Shishir Sarder",
                address: {
                    road: "420/A",
                    zipCode: 5611,
                    country: "Bangladesh",
                },
                email: "test@test.com",
            },
            deliveryMethod: "Super Fast",
        };
        axios
            .post("/orders.json", order)
            .then((response) =>
                this.setState({ loading: false, purchasing: false })
            )
            .catch((error) =>
                this.setState({ loading: false, purchasing: false })
            );
    };

    render() {
        const disabledInfo = { ...this.state.ingrediants };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, meat:false, cheese: true, bacon: false}

        let orderSummary = null;

        let burger = this.state.error ? (
            <h1 style={{ textAlign: "center", color: "red" }}>
                Burger ingrediants can't be loaded!
            </h1>
        ) : (
            <Spinner />
        );

        if (this.state.ingrediants) {
            burger = (
                <Aux>
                    <Burger ingrediants={this.state.ingrediants} />
                    <BuildControls
                        ingrediantAdded={this.addIngrediantHandler}
                        ingrediantRemoved={this.removeIngrediantHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandlader}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingrediants={this.state.ingrediants}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
