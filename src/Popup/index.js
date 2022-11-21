import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./styles.css";

function Popup(props) {
  const [project, setProject] = useState("");
  const [issuetype, setissuetype] = useState("");
  const [priority, setpriority] = useState("");
  const [assignee, setassignee] = useState("");
  const [summary, setsummary] = useState("");
  const [description, setdescription] = useState("");
  const [storypoint, setstorypoint] = useState("");
  const [buttonLabel, setbuttonLabel] = useState("Create");
  
  const setIssueType = (obj) => {
    setissuetype(obj);
  };
  const setPriority = (obj) => {
    setpriority(obj);
  };
  const setAssignee = (obj) => {
    setassignee(obj);
  };
  const setSummary = (event) => {
    setsummary(event.target.value);
  };
  const setStoryPoint = (event) => {
    setstorypoint(event.target.value);
  };
  const setDescription = (event) => {
    setdescription(event.target.value);
  };

 
  const projectOptions = [
    { value: 1, label: "Story" },
    { value: 2, label: "Design of Plan" },
    { value: 3, label: "New Product Development" },
  ];
  const issuetypeOptions = [
    { label: "Story",value: "Story", iconClass: "fa fa-bookmark " },
    { label: "Task", value: "Task",iconClass: "fa fa-check-square" },
    { label: "Bug",value: "Bug", iconClass: "fa fa-circle" },
    { label: "Epic",value: "Epic", iconClass: "fa fa-bolt" },
  ];
  const priorityOptions = [
    { label: "Major", value: "Major", iconClass: "fas fa-equals" },
    { label: "Blocker", value: "Blocker", iconClass: "fas fa-angle-double-up" },
    { label: "Critical", value: "Critical", iconClass: "fas fa-angle-up" },
    { label: "Minor", value: "Minor", iconClass: "fas fa-angle-down" },
    {
      label: "Trivial",
      value: "Trivial",
      iconClass: "fas fa-angle-double-down",
    },
  ];
  const assigneeOptions = [
    {
      label: "Saba Areej",
      value: "Saba Areej",
      Key: "SA",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-130",
    },
    {
      label: "Aitzaz Hassan",
      value: "Aitzaz Hassan",
      Key: "AH",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-131",
    },
    {
      label: "Mohsin Hassan",
      value: "Mohsin Hassan",
      Key: "MH",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-132",
    },
    {
      label: "Ghulam Aashab",
      value: "Ghulam Aashab",
      Key: "GA",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-133",
    },
    {
      label: "Muhammad Abdullah",
      value: "Muhammad Abdullah",
      Key: "MA",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-134",
    },
    {
      label: "Muhammad Ibrahim",
      value: "Muhammad Ibrahim",
      Key: "MI",
      icon: <i class="fa fa-user-circle"></i>,
      id: "IN-135",
    },
  ];
 

  useEffect(() => {
    if (props.object != null) {
      setbuttonLabel("Update");
      const obj = props.object.item;
      setissuetype(obj.issuetype);
      setProject(obj.project);
      setpriority(obj.priority);
      setassignee(obj.assignee);
      setsummary(obj.summary);
      setdescription(obj.description);
      setstorypoint(obj.storypoint);
    }
  }, [props.object]);

  const handleSubmit = () => {
    let obj = {
      project,
       issuetype,
       priority,
       assignee,
       summary,
       description,
       storypoint,
      stage: "backlog",
    };
  props.createTicket(obj);
  };

  return (
    <div className="popup-box">
      <div className="boxcontainer">
        <div><b>{buttonLabel } Issue</b></div>
        <div className="box">
        <div className="project">
          <label>Project</label>
        </div>
        <div className="dropdown">
          <Select
            options={projectOptions}
            value={project}
            onChange={setProject}
          />
        </div>
        <div className="project">
          <label>Issue Type</label>
          <span className="asteric">*</span>
        </div>
        <div className="issuetype">
          <Select 
            className="dropdown"
            options={issuetypeOptions}
            value={issuetype}
            
            onChange={setIssueType}
            getOptionLabel={(e) => (
              <div className="optionItem">
                <div className={"iconContainer " + e.label}>
                  <i className={e.iconClass}></i>
                </div>
                <span className="labelSpan">{e.label}</span>
              </div>
            )}
          />
          <span className="questionMark">?</span>
        </div>
        <div className="project">
          <label>Assignee</label>
          <span className="asteric">*</span>
        </div>
        <div className="dropdown">
          <Select
            options={assigneeOptions}
            onChange={setAssignee}
            value={assignee}
            getOptionLabel={(e) => (
              <div className="iconlabel">
                <div>
                  <i>{e.icon}</i>
                </div>
                <div className="labelSpan">{e.label}</div>
              </div>
            )}
          />
        </div>
        <div className="project">
          <label>Priority</label>
          <span className="asteric">*</span>
        </div>
        <div className="dropdown">
          <Select
            options={priorityOptions}
            onChange={setPriority}
            value={priority}
            getOptionLabel={(e) => (
              <div className="optionItem">
                <div className={"iconContainer " + e.label + " bigIcon"}>
                  <i className={e.iconClass}></i>
                </div>
                <span className="labelSpan">{e.label}</span>
              </div>
            )}
          />
        </div>
        <div className="summary">
          <label>Summary</label>
          <span className="asteric">*</span>
          <input onChange={setSummary} value={summary} ></input>
        </div>
        <div className="summary">
          <label>Story Point</label>
          <span className="asteric">*</span>
          <input
            type={"number"}
            onChange={setStoryPoint}
            value={storypoint}
          ></input>
        </div>

        <div className="summary">
          <label>Description</label>
        </div>
        <div>
          <textarea
            className="description"
            onChange={setDescription}
            value={description}
          ></textarea>
        </div>
      </div>
      <div  className="btn">
      <button
         className="create"
         disabled={!issuetype||!priority||!assignee||!storypoint||!summary}
          onClick={() => {
            handleSubmit();
          }}
        >
          {buttonLabel}
        </button>
        <div className="cancel"
          onClick={props.handleClose}
        >
          Cancel
        </div>
      </div>
      </div>
      </div>
    
  );
}

export default Popup;
