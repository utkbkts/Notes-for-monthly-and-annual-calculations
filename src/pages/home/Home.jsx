import React, { useContext } from "react";
import MyContext from "../../context/context";
import moment from "moment/moment";
import "./Home.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Home = () => {
  const { todo, filteredTodos, handleDeleteDoc, user } = useContext(MyContext);
  return (
    <div className="Dashboard">
      <h2>Home</h2>
      <div className="wrapper">
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((item) => (
            <div className="__a">
              <div className="__b">
                <span>{item.title}</span>
                <span>{item.description}</span>
                <span>Oluşturan Kişi:{item.author}</span>
                <span>
                  Oluşturulma Tarihi:{" "}
                  {moment
                    .unix(item.timestamps.seconds)
                    .startOf("hour")
                    .fromNow()}
                </span>
              </div>
              <div className="__c">
                <span>Yapılacak tarihi</span>
                <div className="__d">
                  <span>{item.selectedMonth}</span>
                  <span>{item.selectedYear}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {user?.uid === item.userId && (
                  <>
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteDoc(item.id)}
                    >
                      Delete
                    </Button>
                    <Link to={`/update/${item.id}`}>
                      <Button type="primary">Edit</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            <span>Todo bulunumadı</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
