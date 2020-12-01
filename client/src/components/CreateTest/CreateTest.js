import React, { useState, useContext } from "react";
import M from "materialize-css";
import "./CreateTest.scss";
import { useHistory } from "react-router-dom";

import CategoryContext from "../../context/CategoryContext";

const CreateTest = () => {
  const categories = useContext(CategoryContext);
  const history = useHistory();
  const [category, setcategory] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
  const [answer, setanswer] = useState("");

  const buttonIsDisabled = () => {
    if (
      question === "" ||
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === "" ||
      answer === ""
    ) {
      return true;
    }
    if (((option1 != option2) != option3) != option4) {
      return false;
    }

    if (
      answer === option1 ||
      answer === option2 ||
      answer === option3 ||
      answer === option4
    ) {
      return false;
    } else {
      return true;
    }
  };

  const postquestion = () => {
    console.log(category);
    //debugger;
    fetch("http://localhost:5000/question/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken -3" });
        } else {
          setoption1("");
          setoption2("");
          setoption3("");
          setoption4("");
          setanswer("");
          setQuestion("");
          M.toast({ html: data.message, classes: "#43a047 green darken -1" });
          // history.push("/signin");
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="add-category  mycard">
      <div className="card auth-card">
        <h2>Add Question</h2>
        <div className="create-test">
          {categories.categories.length > 0 && (
            <select
              onChange={(e) => setcategory(e.target.value)}
              name="category"
              id="category"
            >
              {categories.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="option1"
            value={option1}
            onChange={(e) => setoption1(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="option2"
            value={option2}
            onChange={(e) => setoption2(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="option3"
            value={option3}
            onChange={(e) => setoption3(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="option4"
            value={option4}
            onChange={(e) => setoption4(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="answer"
            value={answer}
            onChange={(e) => setanswer(e.target.value)}
          ></input>
          <button
            disabled={buttonIsDisabled()}
            onClick={() => {
              postquestion();
            }}
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            Submit/new ques
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={() => history.push("/")}
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            End Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
