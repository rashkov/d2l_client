import React, { Component } from "react";
import * as _ from "lodash";
import axios from "axios";
import { Table } from "reactstrap";
import Square from "./square.js";

class ExchangeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: this.props.class,
      currentSession: null
    };
  }
  componentWillMount() {
    console.log("hi", this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentSession: nextProps.currentSession });
    axios
      .get(`http://localhost:3333/sessions/${nextProps.currentSession}`)
      .then(resp => {
        this.setState({ session: resp.data.session });
      });
  }
  render() {
    let main;
    if (this.state.session) {
      console.log("sesh", this.state.session);
      let max_column = 0;
      let a = _.chain(this.state.session.exchanges)
        .filter(exchange => {
          return !_.isEmpty(exchange.date_released);
        })
        .orderBy(["date_released"])
        .reduce((exchanges, exch) => {
          if (exchanges.length == 0) {
            exch.column = 0;
            return [exch];
          } else {
            let previous = exchanges[exchanges.length - 1];
            if (previous.exchange_type == exch.exchange_type) {
              exch.column = previous.column;
            } else {
              exch.column = previous.column + 1;
            }
            if (exch.column > max_column) {
              max_column = exch.column;
            }

            return exchanges.concat(exch);
          }
        }, [])
        .reduce((indexed_exchanges, exch) => {
          indexed_exchanges[exch.student_id] =
            indexed_exchanges[exch.student_id] || {};
          indexed_exchanges[exch.student_id][exch.volunteer_id] =
            indexed_exchanges[exch.student_id][exch.volunteer_id] || [];
          indexed_exchanges[exch.student_id][exch.volunteer_id].push(exch);
          return indexed_exchanges;
        }, {})
        .value();
      console.log("a", a);
      console.log(max_column);

      let rows = [];
      _.each(a, (volunteers, student_id)=>{
        _.each(volunteers, (emails, volunteer_id)=>{
          //console.log(student_id, volunteer_id);
          // let sorted_emails = _.sortBy(emails, 'column');
          let row = <tr>
              {_.chain(_.range(0, max_column))
              .reverse()
              .map((column)=>{
                let emails_in_column = _.filter(emails, { column: column });
                if (emails_in_column.length){
                  return <td>{_.map(emails_in_column, (email)=>{
                    return <Square key={email.id} id={email.id} email={email} />;
                  })}</td>;
                }else{
                  return <td/>;
                }
              })
              .value()
            }
          </tr>;
          rows.push(row);
        });
      });
      main = (
        <Table>
          <thead>
            <tr>
            {_.chain(_.range(0, max_column))
              .reverse()
              .map(col => {
                return <th>{col}</th>;
              })
              .value()}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
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
