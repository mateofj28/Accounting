import "./App.css";
import "../node_modules/primeflex/primeflex.css"
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/themes/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./assets/themes/primeflex.css";
import Login from "./components/authentication/Login";
import Dashboard from "./components/layout/Dashboard";
import SideBar from "./components/layout/SideBar";
import TopBat from "./components/layout/TopBar";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Income from "./components/income/Income";
import Expenses from "./components/expenses/Expenses";
import Auth from "./components/authentication/Auth";
import ForgotPass from "./components/authentication/ForgotPass";
import User from "./components/user/User";
import { UserService } from "./services/UserService";
import Setting from "./components/setting/Setting";
import UserCompany from "./components/setting/UserCompany";
import AccountingAccounts from "./components/setting/AccountingAccounts";
import Balance from "./components/Balance";


function setLogged(value) {
  sessionStorage.setItem("logged", value);
}

function getLogged() {
  return sessionStorage.getItem("logged");
}

function App() {
  const logged = getLogged();
  const location = useLocation();
  const [theme, setTheme] = useState(0)
  // console.log(`Path: ${location.pathname}`);
  // console.log(`logged: ${logged}`);
  const userServices = new UserService()
  React.useEffect(()=>{

    checkAuth()
  }, [])
  //items for company
  const [logo, setLogo] = useState('konexTelecom.png')
  const [companyId, setCompanyId] = useState('')


  const checkAuth = async () => {
    const res = await userServices.checkAuth()
    console.log(res.data.company._id)
    setCompanyId(res.data.company._id)
    setLogo(res.data.company.logo)
  }

  function getDataCompany(data) {
    if (data){        
      setLogo(data.logo)
      setCompanyId(data._id)
    } 
  }

  // con el fin que se ejecute cada vez que actualiza.
  if (logged !== "true") {
    switch (location.pathname) {
      case "/login":
        return <Login setLogged={setLogged} getDataCompany={getDataCompany}/>;
      case "/auth":
        return <Auth setLogged={setLogged} />;
      case "/forgotPassword":
        return <ForgotPass setLogged={setLogged} />;
      case "/addUser":
        return <User />;
      default:
        return <Navigate to="/login" />;
    }
  }

  function findTheme() {
    if (theme === 0) {
      setTheme(1)
      //cambio de color blando
    } else {
      setTheme(0)
      //cambio de color a negro
    }
  }

  // when logged is true
  return (
    <div className="min-h-screen lg:flex relative lg:static surface-ground">
      <SideBar logo={logo} setLogged={setLogged}/>
      <div className="min-h-screen flex flex-column relative flex-auto">
        <TopBat setTheme={findTheme} theme={theme} setLogged={setLogged} />
        {/* //Content */}
        <div className="col-12 grid">
          <div className="col-12 md:col-12 lg:col-12 xl:col-12 sm:col-12">
            <div className="p-2 ml-3 lg:pl-7 lg:ml-8 flex flex-column flex-auto">
              <div className="border-round flex-auto border-white-alpha-10">
                <Routes>
                  <Route
                    path="/"
                    element={<Dashboard setLogged={setLogged} />}
                  />
                  <Route
                    path="income"
                    element={<Income />}
                  />
                  <Route
                    path="expenses"
                    element={<Expenses />}
                  />
                  <Route 
                    path="balance"
                    element={<Balance />}
                  />                
                  <Route
                    path="userCompany"
                    element={<UserCompany companyId={companyId}/>}
                  />
                  <Route
                    path="bank"
                    element={<AccountingAccounts />}
                  />
                  <Route
                    path="setting"
                    element={<Setting />}
                  />
                  <Route
                    path="login"
                    element={
                      logged === "true" ? <Navigate to="/" /> : <Login />
                    }
                  />
                  <Route
                    path="auth"
                    element={
                      logged === "true" ? <Navigate to="/" /> : <Auth />
                    }
                  />
                  <Route
                    path="forgotPassword"
                    element={
                      logged === "true" ? <Navigate to="/" /> : <ForgotPass />
                    }
                  />
                  <Route
                    path="addUser"
                    element={
                      logged === "true" ? <Navigate to="/" /> : <User />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        {/* Fin content */}
      </div>
    </div>
  );
}

Login.prototype = {
  setLogged: PropTypes.func.isRequired,
};

export default App;
