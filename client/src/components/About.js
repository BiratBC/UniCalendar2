import React from "react";
import Footer from "./Footer";

function About() {
  return (
    <>
      <div className="imageContainer">
        <h1>
          About Us <br />
          <span>UniCalendar : All events, One Platform</span>
        </h1>
      </div>
      <section className="aboutUs">
        <div className="textContainer">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            distinctio eum, necessitatibus aut aliquid quasi veniam tempora
            molestiae aspernatur molestias unde quis, deleniti obcaecati beatae
            nobis? Deleniti ad ea similique. Quas, incidunt aliquid. Ipsa itaque
            nobis, quam esse debitis modi dignissimos atque blanditiis, labore
            nostrum, voluptates voluptatibus sequi cumque animi tempore officiis
            provident alias soluta qui cum suscipit dolor quisquam?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            accusantium aspernatur cumque, officia mollitia deleniti placeat
            reiciendis eius dolores numquam, adipisci quo illum culpa aperiam
            temporibus totam quis impedit itaque?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            distinctio eum, necessitatibus aut aliquid quasi veniam tempora
            molestiae aspernatur molestias unde quis, deleniti obcaecati beatae
            nobis? Deleniti ad ea similique. Quas, incidunt aliquid. Ipsa itaque
            nobis, quam esse debitis modi dignissimos atque blanditiis, labore
            nostrum, voluptates voluptatibus sequi cumque animi tempore officiis
            provident alias soluta qui cum suscipit dolor quisquam?
          </p>
        </div>
      </section>
      <div className="backgroundContainer">
        <div className="alignContainer">
          <div className="joinContainer">
            <div className="intro">
              <h1>Join our Team</h1>
              <p>
                Get a chance to work with us. Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Debitis quisquam, officia quia
                unde sit quam explicabo ex est quos ipsam commodi? Possimus amet
                corrupti, facere ratione voluptatem quo et enim.
              </p>
            </div>
            <div className="hire">
              {/* <input type="text" placeholder="Email"/> */}
              <button className="btn btn-success">Join</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
