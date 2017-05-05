import React, {Component, PropTypes} from 'react';
import PublicTodoListItem from 'src/views/components/public-todo-list-item';

class PublicTodoListContainer extends Component {
   static propTypes = {
      title: PropTypes.string,
      tasks: PropTypes.array.isRequired,
      handleRowNavigation: PropTypes.func
   }

   render() {
      return(
         <div style={{ display: 'flex', flexDirection: 'column' }} >
            <p>{this.props.title}</p>
            {this.props.tasks.map(task => <PublicTodoListItem key={task.name} task={task} navigateTo={this.props.handleRowNavigation} />  )}
         </div>
      )
   }
}

export default PublicTodoListContainer;
