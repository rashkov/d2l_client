import React, { Component } from "react";
import * as _ from "lodash";
import axios from "axios";

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
      main = "hi";
    } else {
      console.log("nah");
      main = null;
    }
    return (
      <div>
        {main}
        {this.state.currentSession}
      </div>
    );
  }
}
export default ExchangeTable;
