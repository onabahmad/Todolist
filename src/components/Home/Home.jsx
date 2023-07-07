import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [Item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState();
  const [done, setDone] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  function handleAddItem() {
    if (Item.length !== 0) {
      const newData = [...data, Item];
      setData(newData);
      setItem("");
      localStorage.setItem("data", JSON.stringify(newData));
    }
  }
  function handleDelete(index) {
    const newData = [...data];
    newData.splice(index, 1);

    const newDone = done.filter((doneIndex) => doneIndex !== index);

    setData(newData);
    setDone(newDone);

    localStorage.setItem("data", JSON.stringify(newData));
    localStorage.setItem("done", JSON.stringify(newDone));
  }
  function handleEdit(i) {
    setItem(data[i]);
    setShow(true);
    setEdit(i);
  }
  console.log(edit);
  function handleUpdate() {
    const newData = [...data];
    newData.splice(edit, 1, Item);
    setData(newData);
    setShow(false);
    setItem("");
    localStorage.setItem("data", JSON.stringify(newData));
  }

  function handledone(i) {
    if (done.includes(i)) {
      setDone(done.filter((index) => index !== i));
    } else {
      setDone([...done, i]);
    }
  }

  return (
    <div className="home">
      <div className="AppGlass">
        <div className="Container">
          <div className="first_Section">
            <input
              type="text"
              className="search"
              placeholder="To do list...."
              onChange={(e) => setItem(e.target.value)}
              value={Item}
            ></input>

            {!show ? (
              <button className="btn--primary" onClick={handleAddItem}>
                Add Item
              </button>
            ) : (
              <button className="btn--primary" onClick={handleUpdate}>
                Uptade Item
              </button>
            )}
          </div>
          <div className="secound_Section">
            {data.map((a, i) => (
              <div className={`item_Cards  ${done.includes(i) ? "done" : ""}`}>
                <p>{a}</p>
                <div className="btn_delete_edit">
                  <button
                    className="Delete_btn"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                  <button className="edit_btn" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                  <button className="edit_btn" onClick={() => handledone(i)}>
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
