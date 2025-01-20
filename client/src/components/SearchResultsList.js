import React from "react";
import SearchBarListItem from "./SearchBarListItem";

function SearchResultsList({ results, isVisible , boxRef}) {
  return (
    <>
      <div className="search-result-list"  ref={boxRef}>
        {isVisible && results.map((result, id) => {
          return (
            <>
              <div className="search-items" key={result.event_id}>
                <SearchBarListItem
                  eventTitle={result.event_title}
                  eventDescription={result.description}
                  eventId = {result.event_id}
                />
                <hr style={{margin : 0}}/>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default SearchResultsList;
