import React, { useState } from "react";

function SearchBar(props) {
  const [input, setInput] = useState("");

  const fetchEvents = async (inputEvent) => {
    try {
      const response = await fetch("http://localhost:5000/event/filter/search");
      const jsonData = await response.json();
      const result = jsonData.filter((event) => {
        return (
          inputEvent &&
          event &&
          event.event_title &&
          event.event_title.toLowerCase().includes(inputEvent)
        );
      });

      console.log(result);
      props.setResults(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = async (inputEvent) => {
    setInput(inputEvent);
    await fetchEvents(inputEvent);
  };

  return (
    <>
      <div className="search-bar">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 mx-2"
            type="search"
            placeholder="Search Events"
            aria-label="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onClick={() => props.setIsVisible(true)}
          />
          <span style={{display : "flex", alignItems : "center", marginRight : "1rem"}}><i className="fas fa-search" style={{fontSize : 22}}></i></span>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
