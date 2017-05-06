import React, {
  Component,
  PropTypes
} from 'react';
import PublicTodoListItem from 'src/views/components/public-todo-list-item';

class PublicTodoListContainer extends Component {

  static propTypes = {
    tasks: PropTypes.any.isRequired,
    handleRowNavigation: PropTypes.func
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.tasks.map(task => {
          return <PublicTodoListItem key={task.name} task={task} navigateTo={this.props.handleRowNavigation} />
        } )}
      </div>
    );
  }
}

export default PublicTodoListContainer;
