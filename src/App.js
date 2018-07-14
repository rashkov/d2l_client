import React, { Component } from "react";
/* import "./App.css"; */
import * as _ from "lodash";
import * as d2l_logo from "./d2l_logo.png";
import data from "./class_sample_json.js";
import table from "./table.jsx.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true,
      retry: false,
      classroom: data
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
  exchangeColumnJSX(exchange) {
    let color;
    if (exchange.type === "student_to_mentor") {
      color = "#48ab97";
    } else if (exchange.type === "mentor_to_student") {
      color = "#21265e";
    } else {
      color = "#ffffff";
    }
    return (
      <div
        key={exchange.id}
        style={{
          display: "inline-block",
          width: "30px",
          height: "30px",
          backgroundColor: color,
          border: "1px solid black",
          margin: "5px",
          marginBottom: "-5px",
          borderRadius: "5px"
        }}
      />
    );
  }
  getStudentRowJSX(student, exchange_columns) {
    return (
      <div>
        <div
          style={{
            display: "inline-block",
            width: "50px",
            height: "30px"
          }}
        >
          {student.name}
        </div>
        <div style={{ display: "inline-block", width: "50px", height: "30px" }}>
          {student.mentor.name}
        </div>
        {exchange_columns}
      </div>
    );
  }
  getLoginJSX() {
    return (
      <div>
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
  }
  render() {
    let main,
      rows = [];

    _.each(this.state.classroom.students, student => {
      console.log(student);
      let exchange_columns = [];
      _.each(student.exchanges, exchange => {
        exchange_columns.push(this.exchangeColumnJSX(exchange));
      });
      let student_row = this.getStudentRowJSX(student, exchange_columns);
      rows.push(student_row);
    });
    if (!this.state.logged_in) {
      main = this.getLoginJSX();
    } else {
      main = rows;
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
        <div className="col-sm-12">
          <img
            src={d2l_logo}
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              width: "300px"
            }}
            alt="dialog to learn dot org"
          />
        </div>
        <div className="col-sm-12">{main}</div>
      </div>
    );
  }
}

export default App;
