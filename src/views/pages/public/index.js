import React, {
  PropTypes,
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  authActions
} from 'src/core/auth';
import TaskList from 'src/views/components/task-list';
import PublicTodoListContainer from 'src/views/components/public-todo-list-container';

import {
  taskList as firebaseHelper
} from 'src/core/tasks/task-list';

class Public extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    firebaseHelper.getPublicLists()
      .then((lists) => {
        this.setState({
          list: lists
        });
      })
      .catch(() => {});
  }



  handleRowNavigation = rowId => {
    console.log('jjj');
  }

  render() {
   return (
      <div
        style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>public page</div>
          <div style={{ flex: 2, width: '100%', padding: '0 50px' }}>
            <PublicTodoListContainer
              title="test title"
              handleRowNavigation={this.handleRowNavigation}
              tasks={this.state.list}
            />
          </div>
      </div>
    );
  }
}

Public.propTypes = {};

export default connect(null, authActions)(Public);
