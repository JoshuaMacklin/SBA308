// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    
    
    // here, we would process this data to achieve the desired result.

    // Iterate through Submissions.
    // If learner_id is not in set
        // log learner_id into learner_ids set
        // Create new object in results array with learner_id
    
    // If submission.submitted_at < due date, (validSubmission)
    // take submission score and ag assignmentpoints possible into variable
    // add those to total score & total possible score to get average at end.

    // To Do: For each assignment, add a new line to results for every assignment with earned points and possible points

    // Calculate avg for submission.assignment.id where submission.submission.submitted_at is < ag.assignment.due_at
    const result = [
        //   {
        //     id: 125,
        //     avg: 0.985, // (47 + 150) / (50 + 150)
        //     1: 0.94, // 47 / 50
        //     2: 1.0 // 150 / 150
        //   },
        //   {
        //     id: 132,
        //          the ID of the learner for which this data has been collected
        //     avg: 0.825, // (39 + 124) / (50 + 150)
        //          the learner’s total, weighted average, in which assignments with more points_possible should be counted for more e.g. a learner 
        //          with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%
        //     1: 0.78, // 39 / 50
        //          if an assignment is not yet due, it should not be included in either the average or the keyed dictionary of scores
        //     2: 0.84 // late: (140 - 14) / 150
        //   }
        ];
    
    let learner_ids = new Set()

    let todaysDate = new Date().toISOString().split('T')[0]

    // let total = 0
    
    for (let submission of submissions) {
        // debugger
        let learnerId = submission.learner_id
        let assignmentIndex = ag.assignments.findIndex(assignment => assignment.id === submission.assignment_id)

        score = submission.submission.score
        possibleScore = ag.assignments[assignmentIndex].points_possible
        
        submittedAt = submission.submission.submitted_at
        assignmentDueAt = ag.assignments[assignmentIndex].due_at

        // totalScore = 0
        // totalPossibleScore = 0
        // learner_ids.findIndex(student => student.id === learnerId)
        // ag.assignments.findIndex(student => student.id === 125)
        // if(assignmentDueAt < todaysDate) { // Not due yet
        
        if (!learner_ids.has(learnerId)){
            learner_ids.add(learnerId)
            // let score = validSubmission()
            result.push({id: learnerId, avg: 0, total: validSubmission(), possible_score: possibleScoreSubmission()});
            learnerIdIndex = result.findIndex(student => student.id === learnerId)
            result[learnerIdIndex]['1'] = score / possibleScore
            // result[learnerIdIndex]['hi'] = "Hi"
            // console.log(result.findIndex(student => student.id === learnerId));
        } else {
            // let score = validSubmission()
            learnerIdIndex = result.findIndex(student => student.id === learnerId)
            if (typeof(score) == 'number') {
                result[learnerIdIndex].total += validSubmission(submission, learnerIdIndex)
            }
            // result[learnerIdIndex][1] = (validSubmission() / possibleScoreSubmission());
            result[learnerIdIndex]['2'] = score / possibleScore
            result[learnerIdIndex].possible_score += possibleScoreSubmission()
            // result.push({id: learnerId, avg: 0});
        }
        learnerIdIndex = result.findIndex(student => student.id === learnerId)
        result[learnerIdIndex].avg = (result[learnerIdIndex].total / result[learnerIdIndex].possible_score)
        studentId = result.findIndex(student => student.id === learnerId);
        // delete result.total;
        // delete result.possible_score;
    };

    function validSubmission(learnerIdIndex) {
        if ( assignmentDueAt <= todaysDate) {
            if( submittedAt <= assignmentDueAt ) {
                return score
            } else {
                return (score * 0.9)
            }
        } else {
            return 0;
        }
    }

    function possibleScoreSubmission() {
        if ( assignmentDueAt <= todaysDate) {
            return possibleScore
        } 
        else {
            return 0;  
        }
    }

    // Object.keys(result).find(key => obj[key] === 'John')

    // console.log(learner_ids);
    
    
    return result;
    
  }
   
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

  result.forEach(res => {
    delete res.total
    delete res.possible_score
  });
  console.log(result);