import React from "react";

class Manager extends React.Component {
  componentDidMount() {
    this.callurl();
  }
  render() {
    return <div>매니저 페이지!!~ </div>;
  }
  callurl = () => {
    const ClickSave = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      cors: "no-cors",
    };
    fetch("https://byeongchanhan.github.io/abouts", ClickSave).then((res) =>
      console.log(res.json())
    );
  };
}
export default Manager;
