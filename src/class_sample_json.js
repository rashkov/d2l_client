export default {
  id: 19,
  class_name: "1st period",
  students: [{
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
        date: "2018-02-02",
        type: "student_to_mentor",
        text: "...",
        released: true,
        released_by: 22,
        released_on: "2018-02-03",
        flagged: false,
        flagged_by_filter: false,
        flagged_by: null
      },
      {
        date: "2018-02-03",
        type: "mentor_to_student",
        text: "...",
        released: false,
        released_by: null,
        released_on: null,
        flagged: true,
        flagged_by_filter: false,
        flagged_by: 22
      }
    ]
  }]
};

