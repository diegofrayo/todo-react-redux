import React, {
  PropTypes,
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  browserHistory
} from 'react-router';
import {
  paths
} from 'src/views/routes.js';
import {
  authActions
} from 'src/core/auth';
import TaskList from 'src/views/components/task-list';
import PublicTodoListContainer from 'src/views/components/public-todo-list-container';
import {
  getPublicLists,
  updateSelectedList
} from 'src/core/tasks/actions';

class Public extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.props.dispatch(getPublicLists());
  }

  handleRowNavigation = task => {
    this.props.dispatch(updateSelectedList(task));
    browserHistory.push(paths.PUBLIC_TODO_LIST(task.id));
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <h2 style={{margin: '30px 0'}}>Public ToDo Lists</h2>
          <PublicTodoListContainer
            handleRowNavigation={this.handleRowNavigation}
            tasks={this.props.tasks}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.public
  }
}

export default connect(mapStateToProps)(Public);
