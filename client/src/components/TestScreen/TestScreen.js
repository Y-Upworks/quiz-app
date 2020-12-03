import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/CategoryContext";
import AuthContext from "../../context/AuthContext";
import "./TestScreen.scss";
import "react-responsive-modal/styles.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Modal } from "react-responsive-modal";

const TestScreen = ({ history }) => {
  const category = useContext(CategoryContext);
  const [questions, setQuestions] = useState([]);
  const auth = useContext(AuthContext);
  const { currentSelectedCategory } = category;
  const [open, setOpen] = useState(false);

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
    var marks = 0;
    var totalQuestions = questions.length;

    questions.forEach((ques) => {
      if (ques.ischecked1 === true && ques.option1 === ques.answer) {
        marks = marks + 1;
      }
      if (ques.ischecked2 === true && ques.option2 === ques.answer) {
        marks = marks + 1;
      }
      if (ques.ischecked3 === true && ques.option3 === ques.answer) {
        marks = marks + 1;
      }
      if (ques.ischecked4 === true && ques.option4 === ques.answer) {
        marks = marks + 1;
      }
    });
    var percentage = (marks * 100) / totalQuestions;

    fetch("http://localhost:5000/result/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        percentage: percentage.toString(),
        marks: marks.toString(),
        category: currentSelectedCategory._id,
        user: auth.user._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onOpenModal();
      })
      .catch((err) => console.log(err));
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      validateresult();
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    history.push("/");
  };
  return (
    <div className="test" style={{ marginLeft: "39px" }}>
      <div className="timer-wrapper">
        {questions.length != 0 ? (
          <CountdownCircleTimer
            isPlaying
            // duration={questions.length * 60}
            duration={6}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        ) : null}
      </div>

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
        onClick={validateresult}
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
      >
        End Test
      </button>
      <Modal open={open} onClose={onCloseModal}>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </div>
  );
};

export default TestScreen;
