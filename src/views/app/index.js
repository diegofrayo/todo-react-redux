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
  authActions,
  getAuth
} from 'src/core/auth';
import {
  getUsername
} from 'src/core/tasks';
import {
  paths
} from '../routes';
import Header from '../components/header';


export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    username: PropTypes.string,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {
      router
    } = this.context;
    const {
      auth
    } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    } else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.ROOT);
    }
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          username={this.props.username}
          signOut={this.props.signOut}
        />
        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  getUsername,
  (auth, username) => ({
    auth,
    username
  })
);

export default connect(
  mapStateToProps,
  authActions
)(App);
