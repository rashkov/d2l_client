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
  getSquareJSX(email) {
    console.log(email);
    let unreleased = !email.release_date;
    /* let colors = {
     *   student_email_needs_review: '#b6e4da',
     *   student_email_released: '#48ab97',
     *   mentor_email_needs_review: '#b6e4da',
     *   mentor_email_released: '#48ab97',
     * } */
    let color;
    if (email.type === "student_to_mentor") {
      if (unreleased) {
        color = "#b6e4da";
      } else {
        color = "#48ab97";
      }
    } else if (email.type === "mentor_to_student") {
      if (unreleased) {
        color = "#76a0e7";
      } else {
        color = "#21265e";
      }
    } else {
      color = "#ffffff";
    }
    return (
      <div
        key={email.id}
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
  getStudentRowJSX(student, action_column, released_emails_column) {
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
        {action_column}
        {released_emails_column}
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
  getActionColumnJSX(exchanges) {
    let squares = _.chain(exchanges)
      .map(email => {
        if (!email.release_date) {
          return this.getSquareJSX(email);
        }
      })
      .filter(item => {
        return item;
      })
      .value();
    if (squares.length > 0) {
      let node = (
        <div
          style={{
            border: "1px solid #cc0000",
            display: "inline-block",
            paddingBottom: "5px"
          }}
        >
          {squares}
        </div>
      );
      return node;
    }
  }
  render() {
    let main,
      rows = [];

    _.each(this.state.classroom.students, student => {
      let sorted_exchanges = _.chain(student.exchanges)
        .sortBy("date_received")
        .reverse()
        .value();

      let released_emails_column = [];
      let sorted_exchanges_with_gaps = _.chain(sorted_exchanges)
        .reduce((exchanges_with_gaps, email) => {
          let l, gap_length;
          if ((l = exchanges_with_gaps.length)) {
            console.log(exchanges_with_gaps[l - 1].date, email.date);
            let date1 = new Date(exchanges_with_gaps[l - 1].date);
            let date2 = new Date(email.date);
            gap_length = Math.abs(date1 - date2);
            console.log(gap_length);
            /* if (gap_length = Math.abs(new Date(exchanges_with_gaps[l - 1].date) - (email.date)) < 2) {
             *   console.log(gap_length)
             * } */
          }
          exchanges_with_gaps.push(email);
          return exchanges_with_gaps;
        }, [])
        .value();
      _.each(sorted_exchanges, email => {
        if (email.release_date) {
          released_emails_column.push(this.getSquareJSX(email));
        }
      });

      let action_column = this.getActionColumnJSX(sorted_exchanges);
      let student_row = this.getStudentRowJSX(
        student,
        action_column,
        released_emails_column
      );
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
