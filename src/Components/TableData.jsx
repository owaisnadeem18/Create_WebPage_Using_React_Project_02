import App from "../App.css";
import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
const TableData = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    const response = await fetch("https://api.github.com/users");
    const jsonResponse = await response.json();
    setIsLoading(false);

    setUsers(jsonResponse);

    console.log(users);
  };

  return (
    <div className="container App">
      <div className="row main-wrapper">
        <div className="col-md-6">
          <h1>User Information from an API</h1>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn" onClick={loadUsers}>
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Get Data"
            )}
          </button>
        </div>
      </div>
      <br />
      {users.length ? (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Login</th>
                <th>Type</th>
                <th>GitHUb URL </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={item.avatar_url}>Avatar URL</a>
                    </td>
                    <td>{item.login}</td>
                    <td>{item.type}</td>
                    <td>
                      <a href={item.html_url}>GitHub URL</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="empty-box">
          <img src="/Assests/Images/empty-box.png" alt="" />
          <h4>NO data Found</h4>
        </div>
      )}
    </div>
  );
};

export default TableData;
