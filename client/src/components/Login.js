import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // console.log(body);

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Save token
        props.setAuth(true); // Update authentication state
        toast.success("Login Successfully");
      } else {
        console.error("Login failed:", data);
        toast.error(data);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <section className="" style={{ marginTop: 100 }}>
        <div className="container">
          {/* <div className="row"> */}
          <div
            className="text-black"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div className="" style={{ width: "50%" }}>
              <img
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1741118075~exp=1741121675~hmac=a1bbedc1ae80e2742fb9daa8ed0805c4fe075819e5acf405bab5170ec4f8909e&w=900"
                alt=""
                width={590}
              />
            </div>
            <div
              className="bg-inherit bg-gray-600"
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={onSubmitForm}
              >
                <div style={{ display: "flex" , alignItems: "center"}}>
                  <img src="./favicon.svg" alt="" height={80} width={80} />

                  <h1
                    className="fw-normal"
                    style={{
                      fontFamily: "Neue Plak",
                      fontSize: "3.5rem",
                    }}
                  >
                    UniCalendar
                  </h1>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <div
                    className="top-info"
                    style={{ fontFamily: "Work Sans Medium" }}
                  >
                    <h3>Welcome back !!!</h3>
                  </div>
                  <div className="rows">
                    <div className="icons">
                      <span>
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <div className="rows">
                    <div className="icons">
                      <span>
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <button className="btn btn-success ">Login</button>

                <p className="small mb-5 pb-lg-2 text-center">
                  Forgot password?
                  <a className="text-muted" href="/">
                    Click here
                  </a>
                </p>
                <p className="text-center">
                  Don't have an account?
                  <Link to="/register" className="text-center">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>
    </>
  );
}
