import React, {useState, useEffect} from 'react'

function MyEventsData(props) {

  const [statusColor, setStatusColor] = useState("");
  //https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg
  //red : https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3QOYNQV9XQdX8OigPFftFkxVoGUcVsa17Q&s
  //yellow : https://www.svgrepo.com/show/408266/yellow-circle.svg

  const handleStatusColor = () => {
    if (props.eventStatus === "upcoming") {
      setStatusColor("https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg");
    }
    else if (props.eventStatus === "ongoing") {
      setStatusColor("https://www.svgrepo.com/show/408266/yellow-circle.svg");
    }
    else{
      setStatusColor("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3QOYNQV9XQdX8OigPFftFkxVoGUcVsa17Q&s");
    }
  }

  useEffect(() => {
    handleStatusColor();
  }, [])
  

  return (
    <>
    <div className="eventsTable">
            <a href="/profile/manage-my-events">
              <div className="table-items">
                <div className="table-item">{(props.eventTitle).charAt(0).toUpperCase() + (props.eventTitle).slice(1)}</div>
                <div className="table-item">{props.eventDate}</div>
                <div className="table-item">{props.eventTime}</div>
                <div className="table-item"><img className='mx-2' src={statusColor} alt="" style={{width : 20, height : 20}}/>{(props.eventStatus).charAt(0).toUpperCase() + (props.eventStatus).slice(1)}</div>
              </div>
            </a>
          </div>
    </>
  )
}

export default MyEventsData
