import React from "react";

import "./CategorySession.scss";

const CategorySession = ({ history, match }) => {
  const toggleSession = (sess) => {
    if (sess === "qa") history.push(`/query/${match.params.cid}`);
    else history.push(`/instruction/${match.params.cid}`);
  };

  return (
    <div className="category-session">
      <div className="card" onClick={() => toggleSession("qa")}>
        Q and A
      </div>
      <div className="card" onClick={() => toggleSession("mcq")}>
        MCQ Test
      </div>
    </div>
  );
};

export default CategorySession;
