import React from "react";
import Item from "./Item.jsx";
import "../styles/TodoBox.css";
import { uniqueId } from "lodash";
import { PencilSquare } from "react-bootstrap-icons";

export default class TodoBox extends React.Component {
  renderForm() {
    const { onSubmit, onChange, newTaskText, editingTaskId } = this.props;
    return (
      <form onSubmit={onSubmit} className="d-flex align-items-center">
        <div className="me-3 flex-grow-1">
          <input
            type="text"
            onChange={onChange}
            value={newTaskText}
            required
            className="form-control"
            placeholder="I am going..."
          />
        </div>
        <button type="submit" className="btn btn-primary ms-auto">
          {editingTaskId ? "Edit" : "Add"}
        </button>
      </form>
    );
  }

  render() {
    const { tasks, onRemove, onEdit, resetTasks } = this.props;
    return (
      <div>
        <div className="mb-3">{this.renderForm()}</div>
        <button onClick={resetTasks} className="btn btn-primary mb-3">
          Clear All
        </button>
        {tasks.map(({ text, id }) => {
          return (
            <div key={uniqueId("record_")}>
              <Item task={text} onRemove={onRemove(id)} />
              <button
                onClick={() => onEdit(id, text)}
                className="btn btn-outline-secondary btn-sm edit-btn"
                title="Edit"
              >
                <PencilSquare />
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
