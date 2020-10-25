import React from "react";
import classes from "./Burger.module.css";
import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant";

const burger = (prop) => {
    const transformedIngrediants = Object.keys(prop.ingrediants).map(
        (igKey) => {
            return [...Array(prop.ingrediants[igKey])].map((_, index) => {
                return <BurgerIngrediant key={igKey + index} type={igKey} />;
            });
        }
    );

    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top" />
            {transformedIngrediants}
            <BurgerIngrediant type="bread-buttom" />
        </div>
    );
};

export default burger;
