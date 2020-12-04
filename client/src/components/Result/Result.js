import React, { useEffect, useState, useContext } from "react";
import "./Result.scss";
import AuthContext from "../../context/AuthContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Progressbar from "../progressbar/progressbar";
const percentage = 66;

export const Result = () => {
  const [result, setResult] = useState([]);
  const auth = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/result/showresult", {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzY1MDNhNGFiNDMwNDcxNDcwM2QzMiIsImlhdCI6MTYwNzA5MzMzNX0.EweZQP3iQu8-gfDPzscoGanTbVd3za1645n3AXbvHdg`,
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((result) => setResult(result.userresults))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div>
        <h3 className="username">
          Candidate Name: {auth.user && auth.user.name}
        </h3>
      </div>
      {result.map((res) => {
        return (
          <div className="result">
            <div>
              <div style={{ padding: "10px 10px 10px 10px", float: "right" }}>
                <Progressbar label="Custom colors">
                  <CircularProgressbar
                    value={percentage}
                    text={`${Math.round(res.percentage)}%`}
                    styles={buildStyles({
                      textColor: "Green",
                      pathColor: "turquoise",
                      trailColor: "gold",
                    })}
                  />
                </Progressbar>
              </div>
              <p>TestName: {res.category.categoryname}</p>
              <p>
                Marks:{res.marks}/{(res.marks * 100) / res.percentage}
              </p>
              <p>Percentage: {Math.round(res.percentage)}%</p>
              <p>Given On:{res.createdAt}</p>
              <p>Result :{res.percentage > 40 ? "pass" : "fail"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
