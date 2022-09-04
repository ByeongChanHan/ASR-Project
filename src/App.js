import React from "react";
import Modal from "./script/Modal";
import "./css/style.css";
import Paging from "./script/Paging";

class App extends React.Component {
  componentDidMount() {
    this.getData();
  }
  constructor(props) {
    super(props);
    this.state = {
      // prompts: [],
    };
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>ASR Performance Test Page</h1>
        </div>
        <div className="cb-section">
          <p>지역 : </p>
          <select defaultValue={""}>
            <option value="" disabled>
              Region
            </option>
            <option value="US">USA</option>
          </select>
          <p>언어 : </p>
          <select name="lang" id="lang" defaultValue={""}>
            <option value="" disabled>
              Language
            </option>
            <option>American English</option>
            <option>Canadian French</option>
            <option>Mexican Spanish</option>
          </select>
          {/* <input type="text" disabled></input> */}
          <button className="nav-upload-btn" onClick={this.FileUpload}>
            파일 업로드
          </button>
          <button id="login-btn" onClick={this.goLoginPage}>
            로그인
          </button>
        </div>
        <Modal tabledata={this.SetTableData}></Modal>
        {/* 테이블 */}
        <table className="tb">
          <thead>
            <tr>
              <th colSpan={4} className="reference-th">
                Reference
              </th>
              <th colSpan={4} className="response-th">
                Response
              </th>
              <th colSpan={3} className="analysis-th">
                Analysis
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="reference-tr">Prompt</td>
              <td className="reference-tr">Domain</td>
              <td className="reference-tr">Intent</td>
              <td className="reference-tr">Slot</td>
              <td className="response-tr">ReCognition String</td>
              <td className="response-tr">Domain</td>
              <td className="response-tr">Intent</td>
              <td className="response-tr">Slot</td>
              <td className="analysis-tr">Macth</td>
              <td className="analysis-tr">Error Type</td>
              <td className="analysis-tr">...</td>
            </tr>
            {this.state.prompts ? this.renderList() : ""}
          </tbody>
        </table>
        {this.state.maxitems ? this.setPaging() : ""}
        <div className="compare-section">
          <button id="btn-compare" onClick={this.StartCompare}>
            START
          </button>
          <textarea
            id="recognition-rate"
            cols="50"
            disabled
            placeholder="< Log Screen >"
          ></textarea>
        </div>
      </div>
    );
  }
  setPaging = () => {
    return <Paging maxitems={this.state.maxitems} />;
  };

  // 버튼 텍스트가 로그아웃 일때는 logout 파라미터를 보내서 호출하고
  // 텍스트가 로그인일때는 /login path 이동
  goLoginPage = async () => {
    let loginbtntext = document.querySelector("#login-btn").innerHTML;
    if (loginbtntext === "로그아웃") {
      const logoutCall = await this.callData("logout");
      console.log(logoutCall);
      if (logoutCall === undefined) {
        window.location.reload();
      }
    } else {
      window.location.href = "/login";
    }
  };

  SetTableData = (data) => {
    // 파일 선택할때 취소 누르면 발생, return 해준다
    // if (data === undefined) {
    //   return;
    // }
    // this.setState({
    //   prompts: [...this.state.prompts, data.name],
    // });
  };

  FileUpload = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  };

  getData = async () => {
    const writeData = await this.callData("home");
    //로그인이 안되어있을경우
    if (writeData.islogin === undefined) {
      document.querySelector("#login-btn").innerHTML = "로그아웃";
    } else {
      document.querySelector("#login-btn").innerHTML = "로그인";
    }
    let [promptData, domainData, intentData, slotData] = [[], [], [], []];
    for (let idx = 0; idx < writeData.length; idx++) {
      promptData.push(writeData[idx].prompt);
      domainData.push(writeData[idx].domain);
      intentData.push(writeData[idx].intent);
      slotData.push(writeData[idx].slot);
    }
    this.setState({
      maxitems: writeData.length,
      prompts: promptData,
      domain: domainData,
      intent: intentData,
      slot: slotData,
    });
  };

  // 매개변수로 param을 받고 get 호출한다.
  callData = (param) => {
    const ClickSave = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      cors: "no-cors",
    };
    return (
      fetch(`/${param}`, ClickSave)
        .then((res) => {
          if (!res.redirected) {
            let dataSet = res.json();
            return dataSet;
          }
        })
        //로그인/로그아웃을 계속 반복하다보면 연결이 끊어질때가 있는데 이때 다시 재귀함수 호출
        .catch((error) => {
          // this.callData(param);
        })
    );
  };

  //start 버튼 클릭할때 호출하는 함수(수정 예정)
  StartCompare = () => {
    window.location.href = "/about";
    //   const ClickSave = {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //     },
    //     cors: "no-cors",
    //   };
    //   fetch("/secret", ClickSave)
    //     .then((res) => res.text())
    //     .then((objectData) => console.log(txt));
  };
  // 조회 데이터가 있을때 map함수로 돌면서 WriteList 클래스를 보여준다
  renderList = () => {
    const renderingList = this.state.prompts.map((listarr, index) => {
      return (
        <WriteList
          prompts={listarr}
          domain={this.state.domain[index]}
          intent={this.state.intent[index]}
          slot={this.state.slot[index]}
          key={index}
        />
      );
    });
    return renderingList;
  };
}

class WriteList extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.prompts}</td>
        <td>{this.props.domain}</td>
        <td>{this.props.intent}</td>
        <td>{this.props.slot}</td>
        <td>find starbucks</td>
        <td>Navi</td>
        <td>Search</td>
        <td>starbucks</td>
        <td>O</td>
        <td>-</td>
        <td></td>
      </tr>
    );
  }
}

export default App;
