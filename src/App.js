import React, { useState } from "react";
import Popup from "./Popup";
import "./style.css";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [index, setindex] = useState(-1);
  const [id, setid] = useState(1);
  const handleCreate = (obj) => {
    setid(id + 1);
    let itemobj = {
      id: id,
      item: obj,
    };
    let a = [...list];
    if (index == -1) {
      a.push(itemobj);
    } else {
      a.splice(index, 1, itemobj);
      setindex(-1);
    }
    setList(a);
    togglePopup();
  };

  const edit = (index) => {
    setindex(index);
    setIsOpen(true);
  };
  const dragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
  };
  const TodoItem = ({ obj, index }) => {
    return (
      <div key={obj.id} className="container">
        <div
          class="item"
          draggable
          onClick={() => {
            edit(index);
          }}
          onDragStart={(e) => dragStart(e, obj.id)}
        >
          <div id="summary">{obj.item.summary}</div>
          <div id="homescreen">Home Screen</div>
          <div className="footer">
            <div className="footerstart">
              <div className={"iconContainer " + obj.item.issuetype.label}>
                <i className={obj.item.issuetype.iconClass}></i>
              </div>
              <div
                className={
                  "iconContainer " + obj.item.priority.label + " bigIcon"
                }
              >
                <i className={obj.item.priority.iconClass}></i>
              </div>
              <div className="storypoint">{obj.item.storypoint}</div>
            </div>
            <div className="footerend">
              <div>{obj.item.assignee.id}</div>
              <div class="assignee">
                {obj.item.assignee.Key}
                <span class="tiptext">Assignee: {obj.item.assignee.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const dragOver = (event) => {
    event.preventDefault();
  };
  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("text");
    let item = list.filter((card) => {
      if (card.id == id) {
        card.item.stage = cat;
      }
      return card;
    });
    setList(item);
  };
  return (
    <div className="parent">
      <div className="App-header">
        <div className="b1" onClick={togglePopup}>
          <i className="fa fa-plus"></i>
        </div>
      </div>
      <div className="divs">
        <div
          className="App"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => onDrop(e, "backlog")}
        >
          <div className="heading">BACKLOG</div>
          <div className="list">
            {list
              .filter((obj) => obj.item.stage == "backlog")
              .map((obj, index) => (
                <TodoItem obj={obj} index={index} />
              ))}
          </div>
        </div>
        <div
          className="App"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => onDrop(e, "todo")}
        >
          <div className="heading">TO DO</div>
          <div className="list">
            {list
              .filter((obj) => obj.item.stage == "todo")
              .map((obj, index) => (
                <TodoItem obj={obj} index={index} />
              ))}
          </div>
        </div>

        <div
          className="App"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => onDrop(e, "ongoing")}
        >
          <div className="heading">ON GOING</div>
          <div className="list">
            {list
              .filter((obj) => obj.item.stage == "ongoing")
              .map((obj, index) => (
                <TodoItem obj={obj} index={index} />
              ))}
          </div>
        </div>
        <div
          className="App"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => onDrop(e, "done")}
        >
          <div className="heading">DONE</div>
          <div className="list">
            {list
              .filter((obj) => obj.item.stage == "done")
              .map((obj, index) => (
                <TodoItem obj={obj} index={index} />
              ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <Popup
          createTicket={handleCreate}
          object={list[index]}
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
