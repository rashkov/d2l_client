import React, { Component } from "react";
import * as _ from "lodash";

class ExchangeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: this.props.class
    };
  }
  render() {
    let a = _.chain(this.state.classroom.students)
      .flatMap((all_exchanges, index, student) => {
        console.log(student);
        return student.exchanges;
      }, [])
      .value();
    console.log(a);
    return <div>hey ya</div>;
  }
}
export default ExchangeTable;
