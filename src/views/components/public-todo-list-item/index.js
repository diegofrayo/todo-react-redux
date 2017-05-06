import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';

class PublicTodoListItem extends Component {

  static propTypes = {
    navigateTo: PropTypes.func,
    task: PropTypes.object
  }

  render() {
    const {
      task
    } = this.props;
    return (
      <div className={classNames('task-item')} tabIndex="0">
        <div className="cell" style={{ flex: 2 }} >
          <p>{task.name} ({task.posts ? task.posts.length : 0})</p>
        </div>
        <div className="cell" style={{ padding: 0, justifyContent: 'flex-end' }}>
          <button
            aria-hidden={'goTo'}
            aria-label="navigate"
            style={{paddingLeft: 3}}
            className={classNames('btn task-item__button')}
            onClick={() => this.props.navigateTo(this.props.task)}
            type="button">
            <i className="icon fa fa-arrow-right" style={{ fontSize: 20, color: '#999' }} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );

  }
}

PublicTodoListItem.propTypes = {}

export default PublicTodoListItem;
