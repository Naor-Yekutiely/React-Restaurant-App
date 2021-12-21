import React, { useState } from "react";
import "../../Components/Dropdown/Dropdown.css";
import { Button } from "../Button/Button";

//  This component is a DropDwon menu to show the shopping cart from the nav bar

function Dropdown() {
  const [click, setClick] = useState(false);

  function handelClick() {
    setClick(!click);
  }

  function handelCancelSelect(mealid) {
    let tmp = JSON.parse(localStorage.getItem("menu"));
    tmp.selected.map((meal, index) => {
      if (meal.mealid === mealid) {
        if (meal.count > 1)
          tmp.selected[index].count = Number(tmp.selected[index].count - 1);
        else {
          tmp.selected.splice(index, 1);
        }
      }
      return null;
    });
    tmp.numofselected = Number(tmp.numofselected - 1);
    localStorage.setItem("menu", JSON.stringify(tmp));
  }

  return (
    <>
      <ul
        onClick={handelClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {JSON.parse(localStorage.menu).selected.map((meal) => {
          return (
            <li key={meal.mealid} className="dropdown-item">
              {meal.name} X{" " + meal.count}
              <>&nbsp;&nbsp;&nbsp;&nbsp;</>
              <div
                onClick={() => {
                  handelCancelSelect(meal.mealid);
                }}
              >
                <Button
                  bgtext={<i className="fas fa-minus"></i>}
                  smtext=""
                  width=""
                  height=""
                  link={window.location.pathname}
                />
              </div>
            </li>
          );
        })}
        {JSON.parse(localStorage.menu).selected.length === 0 ? (
          <li className="dropdown-item" style={{ textAlign: "center" }}>
            Your cart is Empty!
          </li>
        ) : (
          <Button
            bgtext="Procced to Checkout"
            smtext="Press Here"
            width="100%"
            height="100%"
            link="/checkout"
          />
        )}
      </ul>
    </>
  );
}

export default Dropdown;
