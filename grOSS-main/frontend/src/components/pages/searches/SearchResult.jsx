import React, { useState } from "react";
import axios from "axios";
import Genuine from "./Genuine";
import SecurityResult from "./SecurityResult";
import report from "./report.pdf";
import "./SearchResult.css";
import { ResultPlaceHolder } from "../../PlaceHolder";

function SearchResult(props) {
  const url = props.repo.RepoURL;
  const [check, setCheck] = useState(0);
  const [gencheck, updateGen] = useState({ data: "" });
  const [seccheck, updateSec] = useState({ data: "" });
  async function checkGenuiness() {
    setCheck(0);
    setCheck(1);
    try {
      const response = await axios.post("/api/genuineness_check", { url: url });
      updateGen(() => {
        return {
          data: response.data,
        };
      });
      setCheck(2);
    } catch (error) {
      setCheck(0);
	  throw error;
    }
  }
  async function securityResult() {
    setCheck(0);
    setCheck(1);
    try {
      const response = await axios.post("/api/repo-sec", { url: url });
      updateSec((prev) => {
        return {
          data: response.data,
        };
      });
      setCheck(3);
    } catch (error) {
      setCheck(0);
	  throw error;
    }
  }

  return (
    <>
      <div
        className="card"
        style={{
          margin: "5%",
          marginTop: "5em",
          backgroundColor: "#0d1117",
          border: "1px #30363d solid",
        }}
      >
        <h5 className="card-header position-relative">
          {props.repo.Repository_Name}
          <div
            id="downloadicon"
            className="position-absolute top-0 end-0"
            style={{ padding: "2rem" }}
          >
            <a
              href={report}
              target="_blank"
              download
              onClick={() => {
                var el = document.getElementById("alertplace");
                el.setAttribute("style", "visibility: visible");
              }}
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  style={{ fill: "green" }}
                  d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"
                />
              </svg>
            </a>
          </div>
          <div id="onhoverdld">Download Report</div>
        </h5>
        <div className="card-body">
          <h5 className="card-title">{props.repo.Author}</h5>
          <p className="card-text">{props.repo.Description}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              onClick={checkGenuiness}
              className="btn btn-success"
              style={{
                borderStyle: "solid",
              }}
            >
              Genuiness
            </button>
            <button
              onClick={securityResult}
              className="btn btn-success"
              style={{
                borderStyle: "solid",
              }}
            >
              Security Result
            </button>
          </div>
        </div>
      </div>

      {check === 1 && <ResultPlaceHolder />}
      {check === 2 && <Genuine data={gencheck.data} />}
      {check === 3 && <SecurityResult data={seccheck.data} />}
    </>
  );
}

export default SearchResult;
