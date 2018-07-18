import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
/* import "./App.css"; */
import * as _ from "lodash";
import * as d2l_logo from "./d2l_logo.png";
import data from "./class_sample_json.js";
import Square from "./square.js";
import HelpKey from "./helpKey.js";
import ExchangeTable from "./ExchangeTable.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      retry: false,
      classroom: data,
      popoverOpen: false
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
        {/* {action_column} */}
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
          /* return this.getSquareJSX(email); */
          return <Square key={email.id} id={email.id} email={email} />;
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
        .reverse()
        .reduce((exchanges_with_gaps, email) => {
          let l, gap_length;
          if ((l = exchanges_with_gaps.length)) {
            let date1 = new Date(exchanges_with_gaps[l - 1].date_received);
            let date2 = new Date(email.date_received);
            let gap_length_days =
              Math.abs(date1 - date2) / (60 * 60 * 24 * 1000);
            if (
              gap_length_days >= 2 &&
              exchanges_with_gaps[l - 1].type == "student_to_mentor"
            ) {
              exchanges_with_gaps.push({
                id: _.uniqueId("gap-"),
                type: "awaiting",
                release_date: "2018-07-13"
              });
            }
          }
          exchanges_with_gaps.push(email);
          return exchanges_with_gaps;
        }, [])
        .reverse()
        .value();
      _.each(sorted_exchanges_with_gaps, email => {
        if (email.release_date || email.type == "awaiting") {
          released_emails_column.push(
            <Square key={email.id} id={email.id} email={email} />
          );
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
      /* main = this.getLoginJSX(); */
      main = <ExchangeTable class={this.state.classroom} />;
    } else {
      rows.push(<HelpKey class={this.state.classroom} />);
      main = rows;
    }
    return (
      <div
        className="container"
        style={{
          display: "block",
          width: "1600px",
          height: "100%",
          backgroundColor: "white",
          position: "relative"
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
