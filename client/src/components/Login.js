import React, { useState } from "react";

export default function Login({onLogin}) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null)

  const handleLogin = () => {
    if (username.trim() === "") {

      setError("Please enter a username");
    }
    else{
    const user = {
      name: username,
      additionalInfo: "Some extra info about the user",
    };
    onLogin(user);
    setError("");
  }
  };
  return (
    <>
      <section className="" style={{marginTop : 70}}>
        <div className="container-fluid">
          <div className="row">
            <div className="text-black">

              <div className="px-0 ms-xl-4">
                <span className="h1 fw-bold mb-0">
                </span>
              </div>
              <div className="d-flex h-custom-2 px-5 ms-xl-4 mt-0 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "30rem" , display : "flex", flexDirection : "column", alignItems: "center"}}>
                  <h3
                    className="fw-normal mb-3 pb-3"

                  >
                    Log in
                  </h3>

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example18">
                      Username
                    </label>
                    <input
                      // type="email"
                      type="text"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}

                    />
                    <p>{error}</p>
                    
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                    />
                    <p>{error}</p>
                    
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="#!" className="link-info">
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
