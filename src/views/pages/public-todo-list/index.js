import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'react-redux';
import classNames from 'classnames';
import TaskItem from 'src/views/components/task-item';
import {
  getListById
} from 'src/core/tasks/actions';

class PublicTodoList extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

    const {
      list
    } = this.props;

    if (list !== null && list.size === 0) {
      this.props.dispatch(getListById(this.props.params.id));
    }
  }

  render() {

    const {
      list
    } = this.props;

    if (list) {
      return (
        <div className="g-row">
          <div className="g-col">
            <h2 style={{margin: '30px 0'}}>{list.name}</h2>
            { list.posts && list.posts.map((item, index) => <TaskItem key={index} task={item} isPublicPage={true} />) }
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    list: state.tasks.get('selectedList')
  }
};

export default connect(mapStateToProps)(PublicTodoList);
