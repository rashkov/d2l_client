import * as _ from "lodash";
export default {
  id: 19,
  class_name: "1st period",
  students: [
    {
      id: 3,
      name: "Alice",
      real_email: "alice@gmail.com",
      alias_email: "d2l+alice@gmail.com",
      mentor_id: 33,
      mentor: {
        id: 33,
        name: "Keshia",
        real_email: "keshiatheobald@gmail.com",
        alias_email: "d2l+keshia@gmail.com"
      },
      exchanges: [
        {
          id: "1",
          date_received: "2018-03-03",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: null,
          flagged: false,
          flagged_by_filter: false,
          flagged_by: null
        },
        {
          id: "2",
          date_received: "2018-02-28",
          type: "student_to_mentor",
          text: "...",
          released_by: null,
          release_date: null,
          flagged: false,
          flagged_by_filter: false,
          flagged_by: null
        },
        {
          id: "3",
          date_received: "2018-02-28",
          type: "student_to_mentor",
          text: "...",

          released_by: 22,
          release_date: "2018-02-27",
          flagged: false,
          flagged_by_filter: false,
          flagged_by: null
        },
        {
          id: "4",
          date_received: "2018-02-26",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        },
        {
          id: "6",
          date_received: "2018-02-24",
          type: "student_to_mentor",
          text: "...",

          released_by: 22,
          release_date: "2018-02-03",
          flagged: false,
          flagged_by_filter: false,
          flagged_by: null
        },
        {
          id: "7",
          date_received: "2018-02-20",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        },
        {
          id: "9",
          date_received: "2018-02-19",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        }
      ]
    },
    {
      id: 3,
      name: "Bob",
      real_email: "alice@gmail.com",
      alias_email: "d2l+alice@gmail.com",
      mentor_id: 33,
      mentor: {
        id: 33,
        name: "Mike",
        real_email: "keshiatheobald@gmail.com",
        alias_email: "d2l+keshia@gmail.com"
      },
      exchanges: [
        {
          id: "10",
          date_received: "2018-02-03",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        },
        {
          id: "11",
          date_received: "2018-02-02",
          type: "student_to_mentor",
          text: "...",

          released_by: 22,
          release_date: "2018-02-03",
          flagged: false,
          flagged_by_filter: false,
          flagged_by: null
        },
        {
          id: "13",
          date_received: "2018-02-03",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        },
        {
          id: "15",
          date_received: "2018-02-03",
          type: "mentor_to_student",
          text: "...",
          released_by: null,
          release_date: "2018-07-13",
          flagged: true,
          flagged_by_filter: false,
          flagged_by: 22
        }
      ]
    }
  ]
};
