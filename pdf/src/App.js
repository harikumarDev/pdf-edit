import React, { useState } from "react";
import "./App.css";
import { requestUrl, defaultForm } from "./helper";

function App() {
  const [form, setForm] = useState(defaultForm);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfData, setPdfData] = useState(requestUrl);

  const loadPdfHandler = () => {
    setShowPdf(true);
  };

  const savePdf = async () => {
    try {
      const response = await fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: form }),
      });
      const { updatedPdf } = await response.json();
    } catch (err) {
      console.log("Error :: ", err);
      alert("Error in saving PDF");
    }
  };

  return (
    <div className="App">
      <h1>PDF Form</h1>
      <div className="pdf-cont">
        <div className="options">
          <button className="btn load" onClick={loadPdfHandler}>
            Load PDF
          </button>
          <button className="btn save" onClick={savePdf}>
            Save PDF
          </button>
        </div>
        <div className="edit-pdf-cont">
          {showPdf && (
            <div className="loaded-pdf">
              <iframe
                src={pdfData}
                type="application/pdf"
                width="900px"
                height="800px"
                title="pdf Form"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
