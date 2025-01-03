import React from "react";
import TodoBox from "./TodoBox";
import { uniqueId } from "lodash";

export default class TodoBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTaskText: "", tasks: [], editingTaskId: null };
  }

  handleChangeTaskName = ({ target: { value } }) => {
    this.setState({ newTaskText: value });
  };

  handleRemoveTask = (id) => {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter((task) => task.id !== id);
    this.setState({ tasks: filteredTasks });
  };

  handleEditTask = (id, text) => {
    this.setState({ newTaskText: text, editingTaskId: id });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { newTaskText, tasks, editingTaskId } = this.state;
    if (!newTaskText.trim()) return;

    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: newTaskText } : task
      );
      this.setState({
        tasks: updatedTasks,
        newTaskText: "",
        editingTaskId: null,
      });
    } else {
      const newTask = {
        text: newTaskText,
        id: uniqueId("task_"),
        isCompleted: false,
      };
      this.setState({ newTaskText: "", tasks: [...tasks, newTask] });
    }
  };

  resetTasks = () => {
    this.setState({ tasks: [] });
  };

  handleToggleTaskState = (id) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  sortTasks = (tasks) => {
    return tasks
      .slice()
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  };

  render() {
    const { newTaskText, tasks, editingTaskId } = this.state;
    const sortedTasks = this.sortTasks(tasks);
    return (
      <TodoBox
        tasks={sortedTasks}
        newTaskText={newTaskText}
        onChangeName={this.handleChangeTaskName}
        onSubmit={this.handleSubmitForm}
        onRemove={this.handleRemoveTask}
        onToggleState={this.handleToggleTaskState}
        onEdit={this.handleEditTask}
        editingTaskId={editingTaskId}
        resetTasks={this.resetTasks}
      />
    );
  }
}