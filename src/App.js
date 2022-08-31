import React from "react";
import Modal from "./script/Modal";
import "./css/style.css";

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
        <div className="cb_section">
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
        <div className="compare_section">
          <button id="btn_compare" onClick={this.StartCompare}>
            START
          </button>
          <textarea
            id="recognition_rate"
            cols="50"
            disabled
            placeholder="< Log Screen >"
          ></textarea>
        </div>
      </div>
    );
  }

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
    const writeData = await this.callData();
    let [promptData, domainData, intentData, slotData] = [[], [], [], []];
    for (let idx = 0; idx < writeData.length; idx++) {
      promptData.push(writeData[idx].prompt);
      domainData.push(writeData[idx].domain);
      intentData.push(writeData[idx].intent);
      slotData.push(writeData[idx].slot);
    }
    this.setState({
      prompts: promptData,
      domain: domainData,
      intent: intentData,
      slot: slotData,
    });
  };

  callData = () => {
    const ClickSave = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      cors: "no-cors",
    };
    return fetch("/home", ClickSave).then((res) => {
      let _dataSet = res.json();
      return _dataSet;
    });
  };

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
