import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Menu from "./Components/Pages/Menu/Menu";
import LoginForm from "./Components/Login/LoginForm";
import Credentials from "./ApplicationData/Credentials.json";
import Checkout from "./Components/Pages/CheckOut/Checkout";
import MenuData from "./ApplicationData/MenuData";
import ActiveOrders from "./Components/Pages/ActiveOrders/ActiveOrders";

// This is the root component that starts the application and manages the localstorage pull or push if necceary.

function App() {
  const [menu, setMenu] = useState(MenuData);

  useEffect(() => {
    if (localStorage.getItem("menu") != null) {
      setMenu(JSON.parse(localStorage.getItem("menu")));
    } else {
      localStorage.setItem("menu", JSON.stringify(menu));
    }
    if (localStorage.getItem("user") == null)
      localStorage.setItem("user", JSON.stringify(usertempate));
  }, []);

  const [isShowLogin, setIsShowLogin] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [isClient, setIsClient] = useState(false);
  let usertempate = {
    id: "",
    ismanager: false,
    isclient: false,
    ismember: false,
    orders: [],
  };

  const handelSigninClicked = () => {
    if (isManager) {
      setIsManager(false);
      console.log("You are loged out manager!");
      localStorage.setItem("user", JSON.stringify(usertempate));
      return 1;
    }
    if (isClient) {
      setIsClient(false);
      console.log("You are loged out client!");
      localStorage.setItem("user", JSON.stringify(usertempate));
      return 1;
    }
    setIsShowLogin(!isShowLogin);
  };
  const handelLoginClicked = (userName, password) => {
    var logedin = false;
    console.log("userName");
    setIsShowLogin(!isShowLogin);
    Credentials.managers.map((usr) => {
      if (userName === usr.username && password === usr.password) {
        console.log("You are loged in manager!");
        logedin = true;
        setIsManager(true);
        let user = {
          id: userName,
          ismanager: true,
          isclient: false,
          ismember: false,
          orders: [],
        };
        localStorage.setItem("user", JSON.stringify(user));
        return 1;
      }
      return 1;
    });
    Credentials.clients.map((usr) => {
      if (userName === usr.username && password === usr.password) {
        console.log("You are loged in client!");
        logedin = true;
        setIsClient(true);
        let user = {
          id: userName,
          ismanager: false,
          isclient: true,
          ismember: false,
          orders: [],
        };
        localStorage.setItem("user", JSON.stringify(user));
        return 1;
      }
      return 1;
    });
    if (!logedin) console.log("Soory:(");
    return 1;
  };

  const handelCancelClicked = () => {
    console.log("Cancel");
    setIsShowLogin(!isShowLogin);
  };

  return (
    <div>
      <Router>
        <Navbar
          handelSigninClicked={handelSigninClicked}
          isManager={isManager}
          isClient={isClient}
        />
        <LoginForm
          isShowLogin={isShowLogin}
          handelLoginClicked={handelLoginClicked}
          handelCancelClicked={handelCancelClicked}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/activeorders" exact component={ActiveOrders} />
          <Route path="/checkout" exact component={Checkout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
//
