import React, { Component } from "react";
import "./App.css";
import * as _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="App"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: "cyan"
        }}
      >
        {_.range(0, this.props.rows).map(i => {
          return (
            <div key={i}>
              {_.range(0, this.props.cols).map(j => {
                return (
                  <div
                    key={j}
                    style={{
                      display: "inline-block",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "magenta",
                      border: "1px solid black"
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
