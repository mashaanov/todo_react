import React from "react";

export default class Item extends React.Component {
  render() {
    const { task, onRemove, onToggleState, isCompleted } = this.props;
    return (
      <div className="row align-items-center">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onRemove}
            aria-label="Удалить задачу"
          >
            &minus;
          </button>
        </div>
        <div
          className={`col w-50 ${isCompleted ? "text-muted" : ""}`}
          onClick={onToggleState}
          style={{
            cursor: "pointer",
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {task}
        </div>
      </div>
    );
  }
}