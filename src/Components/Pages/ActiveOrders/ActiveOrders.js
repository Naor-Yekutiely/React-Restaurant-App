import React from "react";
import "../ActiveOrders/ActiveOrders.css";

// This component displays and mnipulate all the information about the cuurent active orders for clients and managers

function ActiveOrders() {
  const mystyle = {
    textDecoration: "underline",
  };
  const otherstyle = {
    textDecoration: "none",
    marginRight: "15px",
  };

  return (
    <div className="active-container">
      <div className="secendary-container">
        {display() ? (
          JSON.parse(localStorage.getItem("menu")).paid.map((pay, index) => {
            if (
              JSON.parse(localStorage.getItem("user")).id === pay.id ||
              JSON.parse(localStorage.getItem("user")).ismanager
            )
              return (
                <li className="details-container" key={index}>
                  <div className="details">
                    <span className="text-details">
                      {"Order Number: " + pay.ordernumber}
                      <br></br>
                      {JSON.parse(localStorage.getItem("user")).ismanager ? (
                        <div className="order-status">
                          <label>Order Status: </label>
                          <select
                            className="input-meal-form"
                            defaultValue="1"
                            onChange={(e) => {
                              let tmp = JSON.parse(
                                localStorage.getItem("menu")
                              );
                              JSON.parse(localStorage.getItem("menu")).paid.map(
                                (paid, index) => {
                                  if (paid.ordernumber === pay.ordernumber) {
                                    tmp.paid[index].orderstatus =
                                      e.target.value;
                                    if (
                                      tmp.paid[index].orderstatus ===
                                      "Order Closed"
                                    ) {
                                      tmp.paid.splice(index, 1);
                                    }
                                    localStorage.setItem(
                                      "menu",
                                      JSON.stringify(tmp)
                                    );
                                  }
                                  return null;
                                }
                              );
                            }}
                          >
                            <option value={pay.orderstatus} id="1">
                              {pay.orderstatus}
                            </option>
                            <option
                              className={
                                pay.orderstatus === "order in Progress"
                                  ? "show-nothing"
                                  : ""
                              }
                              value="order in Progress"
                              id="2"
                            >
                              order in Progress
                            </option>
                            <option
                              className={
                                pay.orderstatus === "Order Ready"
                                  ? "show-nothing"
                                  : ""
                              }
                              value="Order Ready"
                              id="3"
                            >
                              Order Ready
                            </option>
                            <option
                              className={
                                pay.orderstatus === "Order Shipped"
                                  ? "show-nothing"
                                  : ""
                              }
                              value="Order Shipped"
                              id="4"
                            >
                              Order Shipped
                            </option>
                            <option
                              className={
                                pay.orderstatus === "Order Delivered"
                                  ? "show-nothing"
                                  : ""
                              }
                              value="Order Delivered"
                              id="5"
                            >
                              Order Delivered
                            </option>
                            <option
                              className={
                                pay.orderstatus === "Order Closed"
                                  ? "show-nothing"
                                  : ""
                              }
                              value="Order Closed"
                              id="5"
                            >
                              Order Closed
                            </option>
                          </select>
                        </div>
                      ) : (
                        "Order Status: " + pay.orderstatus
                      )}
                      <br></br>
                      {"Delivery Address: " + pay.address}
                      <br></br>
                      {"Ordered By: " + pay.firstname + " " + pay.lastname}
                    </span>
                    <div className="dishes">
                      <label style={mystyle}>
                        <i style={otherstyle} className="fas fa-info"></i>Order
                        Detiles:
                      </label>
                      {pay.order.map((dish, index) => {
                        return (
                          <div>
                            {dish.name} X {dish.count}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            return null;
          })
        ) : (
          <h1 className="no-orders">
            No Active Orders to show <i className="far fa-frown"></i>
            <br></br>Yet... <i className="far fa-smile"></i>{" "}
          </h1>
        )}
      </div>
    </div>
  );
}

function display() {
  if (JSON.parse(localStorage.getItem("user")).ismanager === true) return true;
  let result = false;
  JSON.parse(localStorage.getItem("menu")).paid.map((found) => {
    if (JSON.parse(localStorage.getItem("user")).id === found.id) result = true;
    return null;
  });
  return result;
}

export default ActiveOrders;
