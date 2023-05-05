import React, { useState } from "react";
import axios from "axios";

const ItemDetail = ({ item }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const update = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5500/update/${item.id}`;
    await axios.put(url, { title: title, description: description });
  };

  return (
    <div>
      <form>
        <div style={{ padding: ".5rem" }}>
          <b>Title:&nbsp;</b>
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div style={{ padding: ".5rem" }}>
          <b>Description:&nbsp;</b>
          <input
            as="textarea"
            name="description"
            defaultValue={description}
            placeholder="Enter description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button onClick={(e) => update(e)}>Update</button>
      </form>
    </div>
  );
};

export default ItemDetail;
