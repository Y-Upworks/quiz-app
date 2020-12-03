import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/CategoryContext";

import "./TestScreen.scss";

const TestScreen = ({ history }) => {
  const category = useContext(CategoryContext);
  const [questions, setQuestions] = useState([]);

  const { currentSelectedCategory } = category;

  useEffect(() => {
    if (!currentSelectedCategory) {
      history.push("/");
    } else {
      fetch(`http://localhost:5000/question/${currentSelectedCategory._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmEyYzk0MzJiZDE0NDA5MGVmY2Q1ZCIsImlhdCI6MTYwNjAzODU3MH0.2Kk0Pw7jt3o2kPMFzmMztL9vrU5ujJ9kSVShCHcSfB4`,
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setQuestions(
            result.questions.map((question) => {
              return {
                ...question,
                ischecked1: false,
                ischecked2: false,
                ischecked3: false,
                ischecked4: false,
              };
            })
          );
        })

        .catch((err) => console.log(err));
    }
  }, [currentSelectedCategory, history]);

  const verifyquestions = (e, id) => {
    setQuestions((questions) => {
      console.log(e.target.value);

      const res = questions.find((question) => {
        return question._id === id;
      });

      console.log(res);

      if (e.target.value === res.option1) {
        res.ischecked1 = true;
        res.ischecked2 = false;
        res.ischecked3 = false;
        res.ischecked4 = false;
      }
      if (e.target.value === res.option2) {
        res.ischecked2 = true;
        res.ischecked1 = false;
        res.ischecked3 = false;
        res.ischecked4 = false;
      }
      if (e.target.value === res.option3) {
        res.ischecked3 = true;
        res.ischecked1 = false;
        res.ischecked2 = false;
        res.ischecked4 = false;
      }
      if (e.target.value === res.option4) {
        res.ischecked4 = true;
        res.ischecked1 = false;
        res.ischecked2 = false;
        res.ischecked3 = false;
      }

      console.log(res);

      const newques = questions.filter((ques) => {
        return ques._id !== id;
      });

      const indextoreplace = questions.findIndex((ques) => {
        return ques._id === id;
      });

      newques.splice(indextoreplace, 0, res);

      return newques;
    });
  };

  const validateresult = () => {
    var correct = 0;
    var totalQuestions = questions.length;

    questions.forEach((ques) => {
      if (ques.ischecked1 === true && ques.option1 === ques.answer) {
        correct = correct + 1;
      }
      if (ques.ischecked2 === true && ques.option2 === ques.answer) {
        correct = correct + 1;
      }
      if (ques.ischecked3 === true && ques.option3 === ques.answer) {
        correct = correct + 1;
      }
      if (ques.ischecked4 === true && ques.option4 === ques.answer) {
        correct = correct + 1;
      }
    });
    var percentage = (correct * 100) / totalQuestions;
    console.log(percentage);
    console.log(correct);
  };
  return (
    <div className="test" style={{ marginLeft: "39px" }}>
      {questions.map((ques, i) => {
        return (
          <div key={ques._id}>
            <p>
              Q{i + 1}. {ques.question} <span className="marks">1 mark</span>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={ques.ischecked1}
                  value={ques.option1}
                  onChange={(e) => verifyquestions(e, ques._id)}
                />
                <span>{ques.option1}</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={ques.ischecked2}
                  value={ques.option2}
                  onChange={(e) => verifyquestions(e, ques._id)}
                />
                <span>{ques.option2}</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={ques.ischecked3}
                  value={ques.option3}
                  onChange={(e) => verifyquestions(e, ques._id)}
                />
                <span>{ques.option3}</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={ques.ischecked4}
                  value={ques.option4}
                  onChange={(e) => verifyquestions(e, ques._id)}
                />
                <span>{ques.option4}</span>
              </label>
            </p>
          </div>
        );
      })}
      <button
        onChange={validateresult}
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
      >
        End Test
      </button>
    </div>
  );
};

export default TestScreen;
