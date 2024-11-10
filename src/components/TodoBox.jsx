import React from "react";
import Item from "./Item.jsx";
import "../styles/TodoBox.css";
import { PencilSquare } from "react-bootstrap-icons";

export default class TodoBox extends React.Component {
  renderForm() {
    const { onSubmit, onChangeName, newTaskText, editingTaskId } = this.props;
    return (
      <form onSubmit={onSubmit} className="d-flex align-items-center mb-3">
        <div className="me-3 flex-grow-1">
          <input
            type="text"
            onChange={onChangeName}
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

  renderTasks() {
    const { tasks, onRemove, onEdit, onToggleState } = this.props;
    return tasks.map(({ text, id, isCompleted }) => (
      <div key={id} className="task-item mb-2">
        <Item
          task={text}
          onRemove={() => onRemove(id)}
          onToggleState={() => onToggleState(id)}
          isCompleted={isCompleted}
        />
        <button
          onClick={() => onEdit(id, text)}
          className="btn btn-outline-secondary btn-sm edit-btn ms-2"
          title="Edit"
        >
          <PencilSquare />
        </button>
        <hr className="task-divider" />
      </div>
    ));
  }

  render() {
    const { resetTasks } = this.props;
    return (
      <div>
        {this.renderForm()}
        <button onClick={resetTasks} className="btn btn-primary mb-3">
          Clear All
        </button>
        {this.renderTasks()}
      </div>
    );
  }
}