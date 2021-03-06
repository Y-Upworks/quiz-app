import React, { useEffect, useState, useContext } from "react";
import "./Result.scss";
import Loader from "../Loader/Loader";
import AuthContext from "../../context/AuthContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Progressbar from "../progressbar/progressbar";

export const Result = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/result/showresult", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setResult(result.userresults);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div>
            <h3 className="username">
              Candidate Name: {auth.user && auth.user.name}
            </h3>
          </div>
          {result.map((res) => {
            return (
              <div className="result">
                <div>
                  <div
                    style={{ padding: "10px 10px 10px 10px", float: "right" }}
                  >
                    <Progressbar label="Custom colors">
                      <CircularProgressbar
                        value={res.percentage}
                        text={`${Math.round(res.percentage)}%`}
                        styles={buildStyles({
                          textColor: "Green",
                          pathColor: "turquoise",
                        })}
                      />
                    </Progressbar>
                  </div>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    TestName: {res.category.categoryname}
                  </p>
                  <p style={{ fontSize: "18px" }}>
                    Marks:{res.marks}/
                    {res.percentage !== "0"
                      ? (res.marks * 100) / res.percentage
                      : 0}
                  </p>
                  <p style={{ fontSize: "18px" }}>
                    Percentage: {Math.round(res.percentage)}%
                  </p>
                  <p>Given On:{res.createdAt}</p>
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Result :{res.percentage > 40 ? "pass" : "fail"}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Result;
