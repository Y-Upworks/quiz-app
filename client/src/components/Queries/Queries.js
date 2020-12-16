import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-responsive-modal";
import M from "materialize-css";
import "./Queries.scss";
import AuthContext from "../../context/AuthContext";

const Queries = ({ match }) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    {
      fetch(`http://localhost:5000/query/queries/${match.params.cid}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setQuestions(result.queries);
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setQuery("");
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const querySubmitHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/query/postquery/${match.params.cid}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        queryname: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken -3" });
          setQuery("");
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken -1" });
          setQuery("");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitanswer = (text, queryId) => {
    fetch("http://localhost:5000/query/solution", {
      method: "put",
      "Content-Type": "application/json",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        queryId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = questions.map((item) => {
          if (item._id == result.result._id) {
            //  console.log(result);
            return result.result;
          } else {
            //   console.log(item);
            return item;
          }
        });
        console.log(newData);
        setQuestions(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletesolution = (quesId, solutionId) => {
    fetch("http://localhost:5000/query/deletesolution", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        quesId,
        solutionId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = questions.map((item) => {
          if (item._id === result.result._id) {
            return result.result;
          } else {
            return item;
          }
        });

        setQuestions(newData);
      })
      .catch((err) => console.log(err));
  };

  const deleteques = (quesId) => {
    console.log(quesId);
    fetch(`http://localhost:5000/query/deletequery/${quesId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = questions.filter((item) => {
          return item._id !== result._id;
        });
        setQuestions(newData);
      });
  };
  return (
    <div className="queries">
      <button onClick={onOpenModal}>ASK QUERY</button>

      {questions == null ? (
        <p>no questions</p>
      ) : (
        questions.map((ques) => {
          return (
            <>
              <div className="query">
                <div>
                  <div>
                    <div className="del">
                      {" "}
                      <p>BY: {ques.user.name}</p>
                      <i
                        onClick={() => deleteques(ques._id)}
                        className="material-icons"
                        style={{
                          float: "none",
                        }}
                      >
                        delete
                      </i>
                    </div>
                  </div>
                  <h5>
                    <span className="ques">Ques:</span> {ques.queryname}
                  </h5>

                  {ques.solution.map((sol) => {
                    return (
                      <>
                        <hr></hr>
                        {(auth.user._id === sol.postedBy._id ||
                          auth.user._id === "5fc6503a4ab4304714703d32") && (
                          <div style={{ float: "right" }}>
                            <i
                              onClick={() => {
                                deletesolution(ques._id, sol._id);
                              }}
                              className="material-icons"
                              style={{}}
                            >
                              delete
                            </i>
                          </div>
                        )}
                        <h5>
                          <span className="ques"> Ans:</span> {sol.text}
                        </h5>
                      </>
                    );
                  })}
                  <hr></hr>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitanswer(e.target[0].value, ques._id);
                    }}
                  >
                    <input
                      type="text"
                      name="answer"
                      placeholder="add a comment"
                    />
                  </form>
                </div>
              </div>
            </>
          );
        })
      )}

      <Modal open={open} onClose={onCloseModal}>
        <h2>Please Specify your query.</h2>
        <form onSubmit={(e) => querySubmitHandler(e)}>
          <input type="text" value={query} onChange={queryChangeHandler} />
          <button disabled={!query}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Queries;
