import React, { useState, useEffect } from "react";
import { Button } from "../../Button/Button";
import "../Menu/Menu.css";
import Menuitem from "./Menuitem";
import MenuData from "../../../ApplicationData/MenuData.json";

//   This component displays the application's menu and has a cheild component called menuitem for the dishes

function Menu() {
  const [menu, setMenu] = useState(JSON.parse(localStorage.getItem("menu")));
  const [isShowAddMeal, setIsShowAddMeal] = useState(false);

  const [count, setCount] = useState(0);

  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealPrice, SetMealPrice] = useState("");
  const [mealMemberPrice, setMealMemberPrice] = useState("");
  const [mealPic, setMealPic] = useState("");
  const [mealSpicealTags, setMealSpicealTags] = useState("");
  const [mealCategory, setMealCategory] = useState("");

  const handelNameChanged = (e) => {
    setMealName(e.target.value);
  };
  const handelDescriptionChanged = (e) => {
    setMealDescription(e.target.value);
  };
  const handelPriceChanged = (e) => {
    SetMealPrice(e.target.value);
  };
  const handelMemberPriceChanged = (e) => {
    setMealMemberPrice(e.target.value);
  };
  const handelPicChanged = (e) => {
    setMealPic(e.target.value);
  };
  const handelSpicealTagsChanged = (e) => {
    setMealSpicealTags(e.target.value);
  };
  const handelCategoryChanged = (e) => {
    setMealCategory(e.target.value);
  };

  var isManager = JSON.parse(localStorage.getItem("user")).ismanager
    ? true
    : false;

  var isClient = JSON.parse(localStorage.getItem("user")).isclient
    ? true
    : false;

  const handelRestart = () => {
    setMenu(MenuData);
    setCount(1);
  };

  const handelAddMeal = () => {
    setIsShowAddMeal(!isShowAddMeal);
  };

  useEffect(() => {
    if (count) {
      localStorage.setItem("menu", JSON.stringify(MenuData));
      let usertempate = {
        id: "",
        ismanager: false,
        isclient: false,
        ismember: false,
        orders: [],
      };
      localStorage.setItem("user", JSON.stringify(usertempate));
      setCount(0);
    }
  }, [count]);

  const handelSubmit = () => {
    let Menu = JSON.parse(localStorage.getItem("menu"));
    Menu.dishes.push({
      name: mealName,
      mealid: Number(Menu.numofdishes) + 1,
      description: mealDescription,
      price: mealPrice,
      memberprice: mealMemberPrice,
      picture: mealPic,
      category: mealCategory,
      spicealtags: mealSpicealTags,
    });
    Menu.numofdishes = Number(Menu.numofdishes) + 1;
    localStorage.setItem("menu", JSON.stringify(Menu));
    setIsShowAddMeal(!isShowAddMeal);
    setMealName("");
    setMealDescription("");
    SetMealPrice("");
    setMealMemberPrice("");
    setMealPic("");
    setMealSpicealTags("");
    setMealCategory(1);
    setMenu(Menu);
  };

  const renderNow = () => {
    setMenu(JSON.parse(localStorage.getItem("menu")));
  };

  return (
    <div className="container">
      <h1 className="menu-text">
        Main Course Menu<i className="fas fa-utensils"></i>
      </h1>
      <div className="menu-container">
        {menu.dishes.map((meal) => {
          if (meal.category === "main") {
            return (
              <Menuitem
                key={meal.mealid}
                dishNum={meal.mealid}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                memberprice={meal.memberprice}
                picture={meal.picture}
                category={meal.category}
                spicealtags={meal.spicealtags}
                isManager={isManager}
                isClient={isClient}
                renderNow={renderNow}
              />
            );
          }
          return null;
        })}
      </div>
      <h1 className="menu-text-dessert">
        Dessert Menu<i className="fas fa-ice-cream"></i>
      </h1>
      <div className="menu-container">
        {menu.dishes.map((dessert) => {
          if (dessert.category === "dessert") {
            return (
              <Menuitem
                key={dessert.mealid}
                dishNum={dessert.mealid}
                name={dessert.name}
                description={dessert.description}
                price={dessert.price}
                memberprice={dessert.memberprice}
                picture={dessert.picture}
                category={dessert.category}
                spicealtags={dessert.spicealtags}
                isManager={isManager}
                isClient={isClient}
                renderNow={renderNow}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="more-options">
        <div
          className={isManager ? "option" : "no-option"}
          onClick={handelRestart}
        >
          <Button
            bgtext="Restart"
            smtext="This will restart localStorage"
            width="170px"
            height="85px"
          ></Button>
        </div>
        <div
          className={isManager ? "option" : "no-option"}
          onClick={handelAddMeal}
        >
          <Button
            bgtext="Add Meal"
            smtext="Add a new meal to the menu"
            width="170px"
            height="85px"
          ></Button>
        </div>
      </div>
      {isShowAddMeal && (
        <div className="form-meal-container" onSubmit={handelSubmit}>
          <form className="add-meal-container">
            <input
              type="text"
              placeholder="Meal Name"
              className="input-meal-form"
              value={mealName}
              onChange={handelNameChanged}
            ></input>

            <select
              className="input-meal-form"
              onChange={handelCategoryChanged}
              defaultValue="1"
            >
              <option value="1" disabled id="1">
                Select Meal Category
              </option>
              <option value="main" id="2">
                Main
              </option>
              <option value="dessert" id="3">
                Dessert
              </option>
            </select>

            <input
              type="text"
              placeholder="Meal discription"
              className="input-meal-form"
              value={mealDescription}
              onChange={handelDescriptionChanged}
            ></input>
            <input
              placeholder="Meal price"
              className="input-meal-form"
              value={mealPrice}
              onChange={handelPriceChanged}
            ></input>
            <input
              placeholder="Member price"
              className="input-meal-form"
              value={mealMemberPrice}
              onChange={handelMemberPriceChanged}
            ></input>
            <input
              placeholder="Meal image src"
              className="input-meal-form"
              value={mealPic}
              onChange={handelPicChanged}
            ></input>

            <select
              className="input-meal-form"
              onChange={handelSpicealTagsChanged}
              defaultValue="1"
            >
              <option value="1" disabled id="1">
                Select Spiceal Tags
              </option>
              <option value="vegetarian" id="2">
                Vegetarian
              </option>
              <option value="spicy" id="3">
                Spicy
              </option>
              <option value="" id="4">
                none
              </option>
            </select>

            <div className="submit" onClick={handelSubmit}>
              <Button
                bgtext="Add Meal"
                smtext="Click here to add the meal"
                width="170px"
                height="85px"
              ></Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Menu;
