import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/CategoryContext";
import M from "materialize-css";
const TestScreen = () => {
  const category = useContext(CategoryContext);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/question/${category.currentSelectedCategory._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmEyYzk0MzJiZDE0NDA5MGVmY2Q1ZCIsImlhdCI6MTYwNjAzODU3MH0.2Kk0Pw7jt3o2kPMFzmMztL9vrU5ujJ9kSVShCHcSfB4`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setQuestions(result.questions);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ marginLeft: "39px" }}>
      {questions.map((ques, i) => {
        return (
          <>
            <p>
              Q{i + 1}. {ques.question}
            </p>
            <p>
              <label>
                <input type="checkbox" />
                <span>{ques.option1}</span>
              </label>
            </p>
            <p>
              <label>
                <input type="checkbox" />
                <span>{ques.option2}</span>
              </label>
            </p>
            <p>
              <label>
                <input type="checkbox" />
                <span>{ques.option3}</span>
              </label>
            </p>
            <p>
              <label>
                <input type="checkbox" />
                <span>{ques.option4}</span>
              </label>
            </p>
            <button
              //  onClick={() => history.push("/")}
              className="btn waves-effect waves-light #64b5f6 blue darken-1"
            >
              End Test
            </button>
          </>
        );
      })}
    </div>
  );
};

export default TestScreen;
