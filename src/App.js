import React, { Component } from "react";
/* import "./App.css"; */
import * as _ from "lodash";
import * as d2l_logo from "./d2l_logo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      retry: false
    };
  }
  login(evt) {
    evt.preventDefault();
    if (this.textInput.value === "d2l") {
      this.setState({ logged_in: true });
    } else {
      this.setState({ logged_in: false, retry: true });
      setTimeout(() => {
        this.setState({ logged_in: false, retry: false });
      }, 1000);
    }
  }
  render() {
    let main;
    if (!this.state.logged_in) {
      main = (
        <div style={{ marginTop: "10%" }}>
          <div
            style={{
              opacity: this.state.retry ? 1 : 0,
              marginBottom: "10px",
              color: "red"
            }}
          >
            Please try again
          </div>
          <form style={{ width: "50%" }} onSubmit={this.login.bind(this)}>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                ref={input => {
                  this.textInput = input;
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
    } else {
      main = (
        <div>
          <img
            src={d2l_logo}
            style={{ marginBottom: "30px", marginTop: "30px" }}
            alt="dialog to learn dot org"
          />
          {_.range(0, this.props.rows).map(i => {
            return (
              <div key={i}>
                {_.range(0, this.props.cols).map(j => {
                  let color,
                    rnd = Math.random();
                  if (rnd > 0.8) {
                    color = "#48ab97";
                  } else if (rnd < 0.8 && rnd > 0.6) {
                    color = "#ffffff";
                  } else {
                    color = "#21265e";
                  }

                  return (
                    <div
                      key={j}
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        backgroundColor: color,
                        border: "1px solid black",
                        margin: "5px",
                        borderRadius: "5px"
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div
        className="container"
        style={{
          display: "block",
          width: "1600px",
          height: "100%",
          backgroundColor: "white"
        }}
      >
        <div className="col-sm-12">{main}</div>
      </div>
    );
  }
}

export default App;
