import React, { useState } from "react";
import "../Login/LoginForm.css";
import { Button } from "../Button/Button";

//  This component is the log in form to be displayed for user and managers log in

const LoginForm = ({
  isShowLogin,
  handelLoginClicked,
  handelCancelClicked,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handelLoginClick = () => {
    handelLoginClicked(userName, password);
  };

  const handelCancelClick = () => {
    handelCancelClicked(userName, password);
  };

  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form id="myform">
            <h1 className="login-text">Sign In</h1>
            <br />
            <div className="login-boxs">
              <label>Username</label>
              <br></br>
              <input
                type="text"
                name="username"
                className="login-box"
                onChange={(e) => setUserName(e.target.value)}
              />
              <br></br>
              <label>Password</label>
              <br></br>
              <input
                type="password"
                name="password"
                className="login-box"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br></br>
            <div className="btn-form">
              <div onClick={handelLoginClick}>
                <Button
                  form="myform"
                  bgtext="LOGIN"
                  width="120px"
                  height="55px"
                  link="/"
                ></Button>
              </div>
              <div onClick={handelCancelClick}>
                <Button
                  form="myform"
                  bgtext="CANCEL"
                  width="120px"
                  height="55px"
                  link="/"
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
