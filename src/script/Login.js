import React from "react";
import "../css/login-style.css";
import userImage from "../images/user.png";

class Login extends React.Component {
  render() {
    return (
      <div className="LoginSection">
        <img src={userImage} alt="user.PNG"></img>
        <h1>Login</h1>
        <input
          className="LoginField"
          type={"text"}
          id="id"
          name="id"
          placeholder="ID"
          autoComplete="off"
        ></input>
        <input
          className="LoginField"
          type={"password"}
          id="pwd"
          name="pwd"
          placeholder="Password"
          autoComplete="off"
        ></input>
        <button
          className="submit-btn"
          type="submit"
          onClick={this.callLoginData}
        >
          LOGIN
        </button>
      </div>
    );
  }

  callLoginData = async () => {
    let idfield = document.querySelector("#id").value;
    let passwordfield = document.querySelector("#pwd").value;
    if (
      idfield === undefined ||
      idfield === "" ||
      passwordfield === undefined ||
      passwordfield === ""
    ) {
      alert("아이디 또는 비밀번호를 다시 확인하세요.");
      return;
    }

    const logindata = await this.goLogin();
    if (logindata.islogin === true && logindata.islogin !== undefined) {
      window.location.href = "/";
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  goLogin = () => {
    let idData = document.getElementById("id").value;
    let passwordData = document.getElementById("pwd").value;
    let SelectedObject = {
      id: idData,
      pwd: passwordData,
    };
    const ClickSave = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(SelectedObject),
      cors: "no-cors",
    };
    return fetch("/login", ClickSave)
      .then((res) => {
        let dataSet = res.json();
        return dataSet;
      })
      .catch((error) => console.log("실패:", error));
  };
}
export default Login;
