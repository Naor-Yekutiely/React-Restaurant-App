import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Checkout.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

//  This component display the checkout/Payment page for the application. It also implement all the necceray data manipulation needed to store active meals

function Checkout() {
  const [isCard, setIscard] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvcNum, setCvcNum] = useState("");
  const [cardOwnerFirst, setCardOwnerFirst] = useState("");
  const [cardOwnerLast, setCardOwnerLast] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  var id = JSON.parse(localStorage.getItem("user")).id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let tmp = JSON.parse(localStorage.getItem("menu"));
    alert(
      "payment has been successfully processed your order number is : " +
        tmp.ordernum
    );
    tmp.paid.push({
      id: id === "" ? "Guest" : id,
      ordernumber: tmp.ordernum,
      orderstatus: "Order Confirmed",
      address: address,
      order: tmp.selected,
      firstname: data.firstName,
      lastname: data.lastName,
    });
    let user = JSON.parse(localStorage.getItem("user"));
    user.orders.push(String(tmp.ordernum));

    tmp.ordernum = Number(tmp.ordernum) + 1;
    tmp.selected = [];
    tmp.numofselected = 0;

    localStorage.setItem("menu", JSON.stringify(tmp));
    localStorage.setItem("user", JSON.stringify(user));
  };

  let count = 0;

  const paymentChange = (e) => {
    if (e.target.value === "CreditCard") {
      setIscard(true);
      setIsCash(false);
    }
    if (e.target.value === "Cash") {
      setIscard(false);
      setIsCash(true);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 className="shop-hadding">Payment Information</h1>
          <input
            {...register("firstName", {
              required: { value: true, message: "First Name is required" },
            })}
            placeholder="First Name"
            className="input-form"
            onChange={(e) => setCardOwnerFirst(e.target.value)}
          />
          {errors.firstName && (
            <span className="error">
              <i className="fas fa-exclamation-triangle"></i>
              {" " + errors.firstName.message}
            </span>
          )}
          <input
            {...register("lastName", {
              required: { value: true, message: "Last Name is required" },
            })}
            placeholder="Last Name"
            className="input-form"
            onChange={(e) => setCardOwnerLast(e.target.value)}
          />
          {errors.lastName && (
            <span className="error">
              <i className="fas fa-exclamation-triangle"></i>
              {" " + errors.lastName.message}
            </span>
          )}
          <input
            {...register("address", {
              required: { value: true, message: "Address is required" },
            })}
            placeholder="Address"
            className="input-form"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <span className="error">
              <i className="fas fa-exclamation-triangle"></i>
              {" " + errors.address.message}
            </span>
          )}
          <input
            {...register("comment", {
              required: false,
            })}
            placeholder="comment"
            className="input-form"
            onChange={(e) => setComment(e.target.value)}
          />
          {errors.comment && (
            <span className="error">
              <i className="fas fa-exclamation-triangle"></i>
              {" " + errors.comment.message}
            </span>
          )}
          <select
            className="input-form"
            {...register("Payment", {
              required: { value: true, message: "Payment is required" },
            })}
            onChange={paymentChange}
            defaultValue="1"
          >
            <option value="1" disabled id="1">
              Select your payment method
            </option>
            <option value="CreditCard" id="2">
              Credit Card
            </option>
            <option value="Cash" id="3">
              Cash
            </option>
          </select>
          {isCard && (
            <div className="CreditCard">
              <input
                {...register("cardnum", {
                  required: { value: true, message: "Crad Number is required" },
                })}
                placeholder=" Card Number"
                className="input-form"
                onChange={(e) => setCardNum(e.target.value)}
                style={{ marginTop: "15px" }}
              />
              {errors.cardnum && (
                <span className="error">
                  <i className="fas fa-exclamation-triangle"></i>
                  {" " + errors.cardnum.message}
                </span>
              )}
              <input
                {...register("expiry", {
                  required: { value: true, message: "Expiry date is required" },
                })}
                placeholder="Expiry Date"
                className="input-form"
                onChange={(e) => {
                  setExpiryDate(e.target.value);
                }}
              />
              {errors.expiry && (
                <span className="error">
                  <i className="fas fa-exclamation-triangle"></i>
                  {" " + errors.expiry.message}
                </span>
              )}
              <input
                {...register("cvc", {
                  required: { value: true, message: "CVC Number is required" },
                })}
                placeholder="CVC"
                className="input-form"
                onChange={(e) => {
                  setCvcNum(e.target.value);
                }}
              />
              {errors.cvc && (
                <span className="error">
                  <i className="fas fa-exclamation-triangle"></i>
                  {" " + errors.cvc.message}
                </span>
              )}
              <Cards
                cvc={cvcNum}
                expiry={expiryDate}
                focused="name"
                name={cardOwnerFirst + " " + cardOwnerLast}
                number={cardNum}
              />
            </div>
          )}
          <input
            className="input-form"
            type="submit"
            value="Make Payment"
            disabled={
              JSON.parse(localStorage.getItem("menu")).selected.length < 1 ||
              (isCard === false && isCash === false)
                ? true
                : false
            }
          />
        </form>
        <div className="shop">
          <h1 className="shop-hadding">Shopping cart:</h1>
          <span>
            {JSON.parse(localStorage.getItem("menu")) &&
            JSON.parse(localStorage.getItem("menu")).selected.length > 0 ? (
              JSON.parse(localStorage.getItem("menu")).selected.map(
                (meal, index) => {
                  count =
                    Number(count) +
                    Number(
                      JSON.parse(localStorage.getItem("user")).isclient === true
                        ? Number(Number(meal.memberprice) * Number(meal.count))
                        : Number(Number(meal.price) * Number(meal.count))
                    );
                  return (
                    <div key={index} className="shop-item">
                      <span>
                        {meal.name}{" "}
                        <i
                          className="fas fa-times"
                          style={{ color: "black", fontSize: "1rem" }}
                        ></i>
                        {" " + meal.count}
                      </span>
                      <br />
                      <span>
                        {"Unit price: "}
                        {JSON.parse(localStorage.getItem("user")).isclient
                          ? meal.memberprice
                          : meal.price + " "}
                        <>&nbsp;</>
                        <i className="fas fa-dollar-sign"></i>
                      </span>
                    </div>
                  );
                }
              )
            ) : (
              <div style={{ textAlign: "center" }}>
                <span>Shoppig cart is empty</span>
              </div>
            )}
          </span>
          <div className="shop-total">
            <span>
              {"Total: " + count + " "}
              <i className="fas fa-dollar-sign"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
