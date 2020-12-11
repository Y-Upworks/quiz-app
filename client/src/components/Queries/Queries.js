import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

import "./Queries.scss";

const Queries = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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

  const querySubmitHandler = () => {};

  return (
    <div className="queries">
      <button onClick={onOpenModal}>ADD</button>
      <Modal open={open} onClose={onCloseModal}>
        <h2>Please Specify your query.</h2>
        <form onSubmit={querySubmitHandler}>
          <input type="text" value={query} onChange={queryChangeHandler} />
          <button disabled={!query}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Queries;
