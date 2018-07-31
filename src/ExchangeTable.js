import React, { Component } from "react";
import * as _ from "lodash";
import axios from 'axios';

class ExchangeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: this.props.class
    };
  }
  componentDidMount(){
    axios.get('http://localhost:3333/sessions').then((resp)=>{
      this.setState({sessions: resp.data.sessions});
    }).catch((e)=>{
      console.log(e);
    });
  }
  render() {
    let a = _.chain(this.state.classroom.students)
      .flatMap((student) => {
        return student.exchanges;
      })
      .filter((exchange)=>{
        let allowed_types = ['mentor_to_student', 'student_to_mentor'];
        let released = !_.isEmpty(exchange.release_date);
        return allowed_types.indexOf(exchange.type) != -1 && released;
      })
      .orderBy(['release_date'])
      .reduce((exchanges, exch)=>{
        if(exchanges.length == 0){
          exch.column = 0;
          return [exch];
        }else{
          let previous = exchanges[exchanges.length-1];
          if(previous.type == exch.type){
            exch.column = previous.column;
          }else{
            exch.column = previous.column + 1;
          }
          return exchanges.concat(exch);
        }
      }, [])
      .value();
    return <div>
      <select>
      {_.map(this.state.sessions,(session)=>{ return <option val="session.session_name">{session.session_name}</option>; })}
      </select>
    </div>;
  }
}
export default ExchangeTable;
