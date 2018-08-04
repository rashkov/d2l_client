import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import * as _ from "lodash";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.email = props.email;
    this.state.popoverOpen = false;
  }
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  render() {
    let unreleased = !this.state.email.release_date;
    /* let colors = {
     *   student_email_needs_review: '#b6e4da',
     *   student_email_released: '#48ab97',
     *   mentor_email_needs_review: '#b6e4da',
     *   mentor_email_released: '#48ab97',
     * } */
    let color;
    if (this.state.email.exchange_type === "student_to_volunteer") {
      if (unreleased) {
        color = "#b6e4da";
      } else {
        color = "#48ab97";
      }
    } else if (this.state.email.exchange_type === "volunteer_to_student") {
      if (unreleased) {
        color = "#76a0e7";
      } else {
        color = "#21265e";
      }
    } else {
      color = "#ffffff";
    }
    let email_obj = _.chain(this.state.email)
      .keys()
      .map(key => {
        return (
          <div>
            <b>{key}</b>: {JSON.stringify(this.state.email[key])}
          </div>
        );
      })
      .value();
    return (
      <div
        id={"popover-" + this.props.id}
        key={this.state.email.id}
        onClick={this.togglePopover.bind(this)}
        style={{
          display: "inline-block",
          width: "30px",
          height: "30px",
          backgroundColor: color,
          border: "1px solid black",
          margin: "5px",
          marginBottom: "-5px",
          borderRadius: "5px",
          position: "relative"
        }}
      >
        {this.state.email.flagged ? (
          <div style={{ color: "white", position: "absolute" }}>F</div>
        ) : (
          ""
        )}
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={"popover-" + this.props.id}
          toggle={this.togglePopover.bind(this)}
        >
          <PopoverBody>{email_obj}</PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default Square;
