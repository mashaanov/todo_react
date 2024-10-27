import React from "react";
import TodoBox from "./TodoBox";
import { uniqueId } from "lodash";

export default class TodoBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTaskText: "", tasks: [], editingTaskId: null };
  }

  componentDidMount() {
    // Загрузка сохраненных задач из localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.setState({ tasks: savedTasks });
  }

  componentDidUpdate(prevState) {
    // Сохранение задач в localStorage при их изменении
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  handleChangeTask = ({ target: { value } }) => {
    this.setState({ newTaskText: value });
  };

  handleRemoveTask = (id) => () => {
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
      const newTask = { text: newTaskText, id: uniqueId("task_") };
      this.setState({ newTaskText: "", tasks: [...tasks, newTask] });
    }
  };

  resetTasks = () => {
    this.setState({ tasks: [] });
  };

  render() {
    const { newTaskText, tasks, editingTaskId } = this.state;

    return (
      <TodoBox
        tasks={tasks}
        newTaskText={newTaskText}
        onChange={this.handleChangeTask}
        onSubmit={this.handleSubmitForm}
        onRemove={this.handleRemoveTask}
        onEdit={this.handleEditTask}
        editingTaskId={editingTaskId}
        resetTasks={this.resetTasks}
      />
    );
  }
}
