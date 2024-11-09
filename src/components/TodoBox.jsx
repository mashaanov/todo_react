render() {
  const { tasks, onRemove, onEdit, resetTasks } = this.props;
  return (
    <div>
      <div className="mb-3">{this.renderForm()}</div>
      <button onClick={resetTasks} className="btn btn-primary mb-3">
        Clear All
      </button>
      {tasks.map(({ text, id, completed }) => {
        return (
          <div key={uniqueId("record_")}>
            <Item
              task={text}
              onRemove={onRemove(id)}
              onToggle={() => this.props.onToggle(id)}
              completed={completed}
            />
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
