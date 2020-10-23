import React from "react";
import classes from "./Burger.module.css";
import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant";

const burger = (prop) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top" />
            <BurgerIngrediant type="cheese" />
            <BurgerIngrediant type="meat" />
            <BurgerIngrediant type="bread-buttom" />
        </div>
    );
};

export default burger;
