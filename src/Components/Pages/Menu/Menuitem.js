import React from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import "../Menu/Menuitem.css";

//  This component is a cheild component of Menu component. This component displays a single dish. Menu will use this component to display the full menu

function Menuitem(props) {
  function handelSelectMeal(dishNum, isManager) {
    var MenuData = JSON.parse(localStorage.menu);
    if (!isManager) {
      var selected;
      MenuData.dishes.map((dish) => {
        if (dish.mealid === dishNum) {
          selected = dish;
        }
        return selected;
      });
      let tmp = true;
      MenuData.selected.map((m, index) => {
        if (m.mealid === dishNum) {
          tmp = false;
          MenuData.selected[index].count = Number(
            MenuData.selected[index].count + 1
          );
        }
        return 1;
      });
      if (tmp) {
        selected["count"] = 1;
        MenuData.selected.push(selected);
      }
      MenuData.numofselected = Number(MenuData.numofselected) + 1;
      localStorage.setItem("menu", JSON.stringify(MenuData));
    }
    //delete meal
    else {
      var MenuUpdate = MenuData;
      MenuData.dishes.map((dish, index) => {
        if (dish.mealid === dishNum) {
          MenuUpdate.dishes.splice(index, 1);
          localStorage.setItem("menu", JSON.stringify(MenuUpdate));
        }
        return null;
      });
    }
    props.renderNow();
  }

  return (
    <div key={props.Ukey} className="card-container">
      <Card className="card">
        <CardImg className="cardimg" src={props.picture} alt="Card image cap" />
        <CardBody className="card-body">
          <CardTitle tag="h2">
            {props.name} {props.isClient ? props.memberprice : props.price}{" "}
            <i className="fas fa-dollar-sign"></i>{" "}
            {props.spicealtags !== "" && (
              <i
                className={
                  props.spicealtags === "vegetarian"
                    ? "fas fa-seedling"
                    : "fas fa-pepper-hot"
                }
                style={
                  props.spicealtags === "vegetarian"
                    ? { color: "lightgreen" }
                    : { color: "#B22222" }
                }
              ></i>
            )}
          </CardTitle>
          <CardSubtitle tag="h4" className="mb-2 text-muted">
            {props.description} <br />
          </CardSubtitle>
          <CardText tag="h5">
            <br></br>
            {props.isClient && (
              <span>Club Mmebers Enjoy our spiceal price</span>
            )}
            <br />
          </CardText>
        </CardBody>
        <div
          className="card-btn-container"
          onClick={() => {
            handelSelectMeal(props.dishNum, props.isManager);
          }}
        >
          <Button className="card-btn">
            {props.isManager ? "Delete Meal" : "Select"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Menuitem;
