import React, { Component } from "react";
import * as _ from "lodash";
import axios from "axios";
import { Table, Button } from "reactstrap";
import Square from "./square.js";
import "./ExchangeTable.css";
import { api_url, localhost_url } from "./config.js";

class ExchangeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: this.props.class,
      currentSession: null
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentSession: nextProps.currentSession });
    axios.get(`${localhost_url()}/session`).then(resp => {
      this.setState({ session: resp.data });
    });
  }
  render() {
    let main;
    if (this.state.session) {
      console.log("sesh", this.state.session);

      let max_column = 0;

      // indexed emails looks like this: { 11: {9: [email1, email2, email3 ]}}
      // where 11 is the student_id and 9 is volunteer_id
      let indexed_emails = _.chain(this.state.session.emails)
        .filter(email => {
          return email.state == "Sent"; // Only look at sent emails
        })
        .orderBy(["envelope_datetime"]) // Order by datetime, making this a chronological list of emails coming into the system
        //.tap(console.log)
        .reverse()
        .reduce((emails, email) => {
          // Assign a column to each email.
          // Create a new column when two emails which are next to each other chronologically switch from one exchange_type to another
          // Where exchange type is either: student_to_volunteer or volunteer_to_student
          // This should have the effect of drawing a table where each column only contains one type of email:
          //   student_to_volunteer (displayed with a green square), or volunteer_to_student (displayed with a blue square)
          if (emails.length == 0) {
            email.column = 0;
            return [email];
          } else {
            let previous = emails[emails.length - 1];
            if (previous.exchange_type == email.exchange_type) {
              email.column = previous.column;
            } else {
              email.column = previous.column + 1;
            }

            if (email.column > max_column) {
              max_column = email.column;
            }

            return emails.concat(email);
          }
        }, [])
        //.tap(console.log)
        .reduce((indexed_emails, email) => {
          indexed_emails[email.student_id] =
            indexed_emails[email.student_id] || {};
          indexed_emails[email.student_id][email.volunteer_id] =
            indexed_emails[email.student_id][email.volunteer_id] || [];
          indexed_emails[email.student_id][email.volunteer_id].push(email);
          return indexed_emails;
        }, {})
        //.tap(console.log)
        .value();

      console.log("indexed emails: ", indexed_emails);
      console.log("number of columns in table: ", max_column);

      // Generate the table rows. One row per student/volunteer combination
      let rows = [];
      _.each(indexed_emails, (volunteers, student_id) => {
        _.each(volunteers, (emails, volunteer_id) => {
          // Look up the student & volunteer names
          let display_names = _.chain(this.state.session.students)
            .filter(student => student.id == student_id)
            .map(student => {
              let volunteer = _.find(
                student.volunteerBuddies,
                volunteer => volunteer.id == volunteer_id
              );
              return {
                student_display_name: `${student.first_name} ${
                  student.last_name
                }`,
                volunteer_display_name: `${volunteer.first_name} ${
                  volunteer.last_name
                }`
              };
            })
            .head()
            .value();
          let row = (
            <tr>
              <td>{display_names.student_display_name}</td>
              <td>{display_names.volunteer_display_name}</td>
              {_.chain(_.range(0, max_column + 1))
                .map(column => {
                  console.log("col", column);
                  let emails_in_column = _.filter(emails, { column: column });
                  if (emails_in_column.length) {
                    return (
                      <td>
                        {_.map(emails_in_column, email => {
                          return (
                            <Square
                              key={email.id}
                              id={email.id}
                              email={email}
                            />
                          );
                        })}
                      </td>
                    );
                  } else {
                    return <td />;
                  }
                })
                .value()}
            </tr>
          );
          rows.push(row);
        });
      });
      main = (
        <Table bordered>
          <thead>
            <tr className="exchange-head">
              {_.chain(["Student", "Volunteer"])
                .map(s => <th>{s}</th>)
                .value()}
              {_.chain(_.range(0, max_column + 1))
                .reverse()
                .map(col => {
                  return (
                    <th>
                      <Button>Release All</Button>
                    </th>
                  );
                })
                .value()}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      );
    } else {
      console.log("nah");
      main = null;
    }
    return (
      <div>
        {this.state.currentSession}
        {main}
      </div>
    );
  }
}
export default ExchangeTable;
