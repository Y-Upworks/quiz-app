import React, { useContext, useEffect } from "react";
import CategoryContext from "../../context/CategoryContext";

import "./Instructions.scss";

const Instructions = ({ history, match }) => {
  const categories = useContext(CategoryContext);

  const { cid } = match.params;

  useEffect(() => {
    const selectCategory = categories.categories.find(
      (category) => category._id === cid
    );

    categories.setCategory(selectCategory);
  }, [categories, cid]);

  return (
    <div className="instructions">
      <div className="heading">Please read the instructions carefully</div>
      <div className="title">
        {categories.currentSelectedCategory &&
          `${categories.currentSelectedCategory.categoryname.toUpperCase()} TEST`}
      </div>
      <div className="content">
        <ul>
          <li>
            <span style={{ fontWeight: "bold" }}>
              Focus and Purpose of the Test/Quiz -
            </span>
            Provide students context by letting them know what content is being
            focused on for the quiz and the learning goals the quiz is measuring
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>
              Number and Type of Questions -
            </span>
            Letting students know how many questions and whether the questions
            include multiple-choice, true-false, fill-in-the-blank, or essay
            will let them know what to expect and an idea of how long it will
            take them to complete the quiz.
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>
              Whether Students Can Expect Feedback -
            </span>
            Including question feedback is recommended, as it helps students
            better learn from the test experience. This is especially important
            for practice quizzes. Let students know if they will be receiving
            feedback so they know what to expect
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>
              Navigation Instructions -
            </span>
            In an online environment, letting students know what to expect with
            the quiz navigation is important. Will all the questions be on one
            screen? Or, will they need to click "Next" to see the next question?
            What buttons do they click to start or submit a quiz?
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Weighting -</span>
            If you weight your tests or quizzes in the course, let students know
            what that is and the impact this may have on their final grade.
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>
              If the Test/Quiz is Timed -
            </span>
            If a test or quiz is timed, emphasize this to students letting them
            know when the time starts and the importance of completing the test
            in one sitting.
          </li>
        </ul>
        <div className="actions">
          <button onClick={() => history.push("/testmode")}>START</button>
          <button onClick={() => history.push("/")}>BACK</button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
