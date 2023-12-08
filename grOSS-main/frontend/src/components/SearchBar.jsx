import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [searchURL, updateURL] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    props.onClick(searchURL);
  }
  return (
    <div
      className="container-fluid"
      style={{ marginTop: 56, backgroundColor: "#010409", height: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            const val = event.target.value;
            updateURL(val);
          }}
          className="search__input"
          value={searchURL}
          type="text"
          placeholder="Search"
        />
      </form>
      <div className="container" style={{marginTop: "2em"}}>
        <div className="row mx-auto" style={{width: "60%", height: 70}}>
          <div onClick={(event) => {
            const val = "https://github.com/p1xxxel/vulnlauncher"
            updateURL(val)
          }} className="col-2 p-3 mx-auto" style={{backgroundColor: "#42414d", width: "12%", borderRadius: 2}}>
            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/64483930?v=4" />
          </div>
          <div onClick={(event) => {
            const val = "https://github.com/Ultimatesicko/Final-test"
            updateURL(val)
          }} className="col-2 p-3 mx-auto" style={{backgroundColor: "#42414d", width: "12%", borderRadius: 2}}>
            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/75926824?v=4" />
          </div>
          <div onClick={(event) => {
            const val = "https://github.com/r3z3l/freesound"
            updateURL(val)
          }}
          className="col-2 p-3 mx-auto" style={{backgroundColor: "#42414d", width: "12%", borderRadius: 2}}>
            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/65240717?s=48&v=4" />
          </div>
          <div onClick={(event) => {
            const val = "https://github.com/Ultimatesicko/vulnlauncher"
            updateURL(val)
          }}
          className="col-2 p-3 mx-auto" style={{backgroundColor: "#42414d", width: "12%", borderRadius: 2}}>
            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/75926824?v=4" />
          </div>
          <div onClick={(event) => {
            const val = "https://github.com/r3z3l/Quiz-app"
            updateURL(val)
          }}
          className="col-2 p-3 mx-auto" style={{backgroundColor: "#42414d", width: "12%", borderRadius: 2}}>
            <img className="img-fluid" src="https://avatars.githubusercontent.com/u/65240717?s=48&v=4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
