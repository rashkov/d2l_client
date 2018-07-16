import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Square from "./square.js";
import * as _ from "lodash";
class HelpKey extends Component {
  render() {
    let student_email = {
      id: _.uniqueId("sample-"),
      type: "student_to_mentor",
      release_date: "2018-07-13"
    };
    let mentor_email = {
      id: _.uniqueId("sample-"),
      type: "mentor_to_student",
      release_date: "2018-07-13"
    };
    let gap_email = {
      id: _.uniqueId("sample-"),
      type: "awaiting",
      release_date: "2018-07-13"
    };
    let student_unreleased_email = {
      id: _.uniqueId("sample-"),
      type: "student_to_mentor",
      release_date: null
    };
    let mentor_unreleased_email = {
      id: _.uniqueId("sample-"),
      type: "mentor_to_student",
      release_date: null
    };
    return (
      <div
        className="col-sm-6"
        style={{
          position: "absolute",
          marginTop: "30px"
        }}
      >
        <Card>
          <CardBody>
            <CardTitle>Key</CardTitle>
            <CardText>
              <ListGroup>
                <ListGroupItem>
                  <Square
                    key={student_email.id}
                    id={student_email.id}
                    email={student_email}
                  />
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    Student Email (released)
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <Square
                    key={mentor_email.id}
                    id={mentor_email.id}
                    email={mentor_email}
                  />
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    Mentor email (released)
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <Square
                    key={gap_email.id}
                    id={gap_email.id}
                    email={gap_email}
                  />
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    Gap email (mentor hasn't replied for 2 days)
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <Square
                    key={student_unreleased_email.id}
                    id={student_unreleased_email.id}
                    email={student_unreleased_email}
                  />
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    Unreleased Student Email
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <Square
                    key={mentor_unreleased_email.id}
                    id={mentor_unreleased_email.id}
                    email={mentor_unreleased_email}
                  />
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    Unreleased Volunteer Email
                  </div>
                </ListGroupItem>
              </ListGroup>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default HelpKey;
