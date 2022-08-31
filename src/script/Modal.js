import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../css/modal-style.css";

class Modal extends React.Component {
  render() {
    return (
      <div id="modal">
        <div className="modal-content">
          <span className="close" onClick={this.CloseModal}>
            &times;
          </span>
          <DragDrop></DragDrop>
          <div className="uploadSection">
            <button className="uploadbtn" onClick={this.RequestUrl}>
              파일 업로드
            </button>
          </div>
        </div>
      </div>
    );
  }
  CloseModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  };
  RequestUrl = () => {
    let fileTag = document.getElementsByName("file");
    let fileData = fileTag[0].files[0];
    this.props.tabledata(fileData);
    let formData = new FormData();
    formData.set("file", fileData);
    console.log(fileTag);
    // const RequestData = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // };
    // fetch("", RequestData).then((showList) => showList.text());
    this.CloseModal();
  };
}

// 파일 타입
const fileTypes = ["WAV", "PCM", "RAW"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const completeMessage = () => {
    document.querySelector(".dropzone").firstChild.innerText = "첨부 완료";
  };
  return (
    <div className="AttachmentArea">
      <h1>WAV 파일 첨부</h1>
      <FileUploader
        children={
          <div className="dropzone">
            <span>파일을 드래그하여 첨부할 수 있습니다.</span>
          </div>
        }
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle=" "
        onTypeError={() => {
          alert("파일 확장자가 올바르지 않습니다.\n WAV 파일을 첨부해주세요.");
        }}
        onDrop={completeMessage}
        onSelect={completeMessage}
      />
      <p>
        {file
          ? file[0]
            ? `파일이름: ${file[0].name}`
            : "파일 선택을 취소했습니다."
          : "아직 파일을 업로드하지 않았습니다."}
      </p>
    </div>
  );
}

export default Modal;
