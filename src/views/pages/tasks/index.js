import {
  List
} from 'immutable';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'react-redux';
import {
  createSelector
} from 'reselect';

import {
  getNotification,
  notificationActions
} from 'src/core/notification';
import {
  getTaskFilter,
  getVisibleTasks,
  tasksActions,
  getTasks,
  updateAccountConfig
} from 'src/core/tasks';
import {
  getAuth
} from 'src/core/auth';
import Notification from '../../components/notification';
import TaskFilters from '../../components/task-filters';
import TaskForm from '../../components/task-form';
import TaskList from '../../components/task-list';
import ToDoListConfig from '../../components/to-do-list-config';


export class Tasks extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    createTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterTasks: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadTasks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    posts: PropTypes.instanceOf(List).isRequired,
    undeleteTask: PropTypes.func.isRequired,
    unloadTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadTasks();
    this.props.filterTasks(this.props.location.query.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.filter !== this.props.location.query.filter) {
      this.props.filterTasks(nextProps.location.query.filter);
    }
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  handlePrivacyButton = (path, data) => {
    this.props.updateAccountConfig(path, data);
  }

  renderNotification() {
    const {
      notification
    } = this.props;
    return (
      <Notification
        action={this.props.undeleteTask}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {

    const authId = this.props.auth.get('id') || '';
    const isPrivate = this.props.accountConfig.get('is_private');

    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm createTask={this.props.createTask} />
        </div>

        <div className="g-col">
          <div>
            <TaskFilters filter={this.props.filterType} />
            { isPrivate !== null && <ToDoListConfig isPrivate={isPrivate} authId={authId} handlePrivacyClick={this.handlePrivacyButton} /> }
          </div>
          <TaskList
            deleteTask={this.props.deleteTask}
            tasks={this.props.posts}
            updateTask={this.props.updateTask}
          />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getTaskFilter,
  getVisibleTasks,
  getAuth,
  getTasks,
  (notification, filterType, posts, auth, accountConfig) => ({
    notification,
    filterType,
    posts,
    auth,
    accountConfig
  })
);

const mapDispatchToProps = Object.assign({},
  tasksActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
