import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function Genuine(props) {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    setRepos(props.data.result);
  }, []);
  const data = {
    labels: [],
    datasets: [],
  };
  var notRequired = ["Genuineness", "repo_link", "repo_name", "contributions"];
  for (const key in repos[0]) {
    if (notRequired.indexOf(key) === -1) {
      data.labels.push(key);
    }
  }
  for (const repo of repos) {
    var dataset = {};
    dataset.label = repo.repo_name;
    dataset.data = [
      repo["followers"],
      repo["forks"],
      repo["stars"],
      repo["watchers"],
      repo["commits"],
      repo["issues"],
    ];
    const red = Math.floor(((1 + Math.random()) * 256) / 2);
    const green = Math.floor(((1 + Math.random()) * 256) / 2);
    const blue = Math.floor(((1 + Math.random()) * 256) / 2);
    if (repos.indexOf(repo) === 0) {
      dataset.backgroundColor =
        "rgb(" + red + ", " + green + ", " + blue + ", 0.2" + ")";
      dataset.borderColor =
        "rgb(" + red + ", " + green + ", " + blue + ", 1" + ")";
    } else {
      dataset.borderColor =
        "rgb(" + red + ", " + green + ", " + blue + ", 1" + ")";
    }
    dataset.fill = true;
    data.datasets.push(dataset);
  }

  return (
    <>
      <h1 style={{ marginLeft: "5%" }}>Matched Repos</h1>
      {repos.length === 1 && <p>No Repo Found</p>}
      {repos.length > 1 && (
        <div className="row" style={{ margin: "2% 5% 2% 5%" }}>
          {repos.map((res, idx) => {
            if (idx !== 0) {
              return (
                <div className="col-sm-3">
                  <div
                    className="card"
                    style={{
                      margin: "5%",
                      backgroundColor: "#0d1117",
                      border: "1px #30363d solid",
                    }}
                    id="genuineness"
                  >
                    <div className="card-body">
                      <h5 className="card-header">
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-repo color-fg-muted mr-2"
                        >
                          <path
                            style={{ fill: "white" }}
                            fillRule="evenodd"
                            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                          ></path>
                        </svg>
                        <a href={res.repo_link}>{" " + res.repo_name}</a>
                      </h5>
                      <p>
                        <svg
                          text="muted"
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-people"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            fill-rule="evenodd"
                            d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                          ></path>
                        </svg>{" "}
                        {res.followers} followers
                      </p>
                      <p>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-git-pull-request"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            fill-rule="evenodd"
                            d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
                          ></path>
                        </svg>{" "}
                        {res.contributions} contributions
                      </p>
                      <p>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-repo-forked color-fg-muted mr-2"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            fill-rule="evenodd"
                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          ></path>
                        </svg>{" "}
                        {res.forks} forks
                      </p>
                      <p>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-star d-inline-block mr-2"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            fill-rule="evenodd"
                            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                          ></path>
                        </svg>{" "}
                        {res.stars} stars
                      </p>
                      <p>
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                          className="octicon octicon-eye"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            fill-rule="evenodd"
                            d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                          ></path>
                        </svg>{" "}
                        {res.watchers} watching
                      </p>
                      <p>
                        <svg
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            d="M476.8 288C461.1 361 397.4 416 320 416C242.6 416 178 361 163.2 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H163.2C178 150.1 242.6 96 320 96C397.4 96 461.1 150.1 476.8 224H608C625.7 224 640 238.3 640 256C640 273.7 625.7 288 608 288H476.8zM320 336C364.2 336 400 300.2 400 256C400 211.8 364.2 176 320 176C275.8 176 240 211.8 240 256C240 300.2 275.8 336 320 336z"
                          />
                        </svg>{" "}
                        {res.commits} commits
                      </p>
                      <p>
                        <svg
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
                          />
                        </svg>{" "}
                        {res.issues} issues
                      </p>
                      <p>
                        <svg
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            style={{ fill: "#8b949e" }}
                            d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM328.1 304.1C338.3 295.6 338.3 280.4 328.1 271C319.6 261.7 304.4 261.7 295 271L200 366.1L152.1 319C143.6 309.7 128.4 309.7 119 319C109.7 328.4 109.7 343.6 119 352.1L183 416.1C192.4 426.3 207.6 426.3 216.1 416.1L328.1 304.1z"
                          />
                        </svg>{" "}
                        Created on: {res.created}
                      </p>
                      <p>Genuineness: {res.Genuineness} </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      <div className="container-lg" style={{ margin: "5%" }}>
        <Line data={data} />
      </div>
    </>
  );
}

export default Genuine;
