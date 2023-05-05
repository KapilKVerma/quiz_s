import React, { useState, useEffect } from "react";
import "./App.css";

import ItemDetail from "./itemDetail";

import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [items, setItems] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const newObject = { title: title, description: description };
    console.log(newObject);
    const url = `http://localhost:5500/new`;
    await axios.post(url, newObject);
  };

  const fetchData = async () => {
    const url = `http://localhost:5500/list`;
    const response = await axios.get(url);
    setItems(response.data);
  };

  const deleteItem = async (id) => {
    const url = `http://localhost:5500/delete/${id}`;
    await axios.delete(url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <main>
        <header>
          <h3>CREATE NEW ITEMS</h3>
          <div></div>
        </header>

        <section>
          <h4>Add new item by filling out the following form</h4>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br></br>
            <input
              as="textarea"
              name="description"
              placeholder="Enter description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br />
            <button onClick={submit}>Submit</button>
          </form>
        </section>

        <section>
          <h4>Items List</h4>
          {items.length > 0 ? (
            <div>
              {items.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: "1rem",
                      border: "2px solid gray",
                      textAlign: "start",
                    }}
                  >
                    <div style={{ padding: ".5rem" }}>
                      <b>ID:&nbsp;</b>
                      {item.id}
                    </div>
                    <ItemDetail item={item} />
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
