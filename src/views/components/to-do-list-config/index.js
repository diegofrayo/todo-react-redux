import React, {
  Component,
  PropTypes
} from 'react';

import {
  taskList as firebaseHelper
} from 'src/core/tasks/task-list';


class ToDoListConfig extends Component {
  static propTypes = {
    authId: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.share = this.share.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  updateConfig() {

    firebaseHelper.updateAccountConfig(`tasks/${this.props.authId}`, {
        is_private: !this.props.isPrivate
      })
      .then(() => {

      })
      .catch(() => {});

  }

  share() {
    const url = `www.${window.location.hostname}/public/${this.props.authId}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '', 'menubar=no, toolbar=no, resizable=no, scrollbars=no, height=400, width=560');
  }

  render() {
    const isPrivate = this.props.isPrivate;
    return (
      <ul className="to-do-list-config-list">
        <i style={{ color: (isPrivate === true ? '#6F7110' : 'inherit') }} className="fa fa-lock privacy-button" aria-hidden="true" onClick={this.updateConfig}></i>
        { isPrivate === false && <i className="fa fa-facebook share-button" aria-hidden="true" onClick={this.share}></i>}
      </ul>
    );
  }
}

export default ToDoListConfig;
