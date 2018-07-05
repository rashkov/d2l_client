import React, { Component } from "react";
import "./App.css";
import * as _ from "lodash";
import * as d2l_logo from "./d2l_logo.png";

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          display: "block",
          width: "1600px",
          height: "100%",
          backgroundColor: "white"
        }}
      >
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
}

export default App;
