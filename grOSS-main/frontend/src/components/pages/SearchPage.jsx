import React, { useState } from "react";
import SearchBar from "../SearchBar";
import "./SearchPage.css";
import SearchResult from "./searches/SearchResult";
import axios from "axios";
import PlaceHolder from "../PlaceHolder";

function SearchPage() {
  const [searched, updateSearched] = useState(0);
  const [Repo, updateRepo] = useState("");
  async function onClick(val) {
    updateSearched(1);
    try {
      const response = await axios.post("/api/description", { url: val });
      updateRepo(JSON.parse(response.data));
      updateSearched(2);
    } catch (error) {
      updateSearched(0);
      throw error;
    }
  }
  return (
    <>
      {searched === 0 && <SearchBar onClick={onClick} />}
      {searched === 1 && <PlaceHolder />}
      {searched === 2 && <SearchResult repo={Repo} />}
    </>
  );
}

export default SearchPage;
