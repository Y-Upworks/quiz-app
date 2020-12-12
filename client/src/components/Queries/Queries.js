import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import M from "materialize-css";
import "./Queries.scss";

const Queries = ({ match }) => {
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
                  <h5>
                    <span className="ques">Ques:</span> {ques.queryname}
                  </h5>
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
