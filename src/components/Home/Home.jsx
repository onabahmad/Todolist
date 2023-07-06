import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [Item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState();

  function handleAddItem() {
    if (Item.length !== 0) {
      setData((newdata) => [...newdata, Item]);
      setItem("");
    }
  }
  function handleDelete(index) {
    data.splice(index, 1);
    setData([...data]);
  }
  function handleEdit(i) {
    setItem(data[i]);
    setShow(true);
    setEdit(i);
  }
  console.log(edit);
  function handleUpdate() {
    data.splice(edit, 1, Item);
    setData([...data]);
    setShow(false);
    setItem("");
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
              <div
                className="
              item_Cards"
              >
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
