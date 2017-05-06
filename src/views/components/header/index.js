import React, {
  PropTypes
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router';
import {
  paths
} from 'src/views/routes.js';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <header className="header">
        <div className="g-row">
          <div className="g-col">
            <h1 className="header__title">
              <Link to={paths.ROOT}>Todo React Redux</Link>
            </h1>

            <ul className="header__actions">
              { this.props.username && <span className="header__username">Hello <strong>{this.props.username}</strong></span> }
              <li>
                <Link to={paths.PUBLIC}>Public</Link>
              </li>
              { this.props.authenticated ?
                (
                  <span>
                    <li>
                      <Link to={paths.TASKS}>My Tasks</Link>
                    </li>
                    <li>
                      <button className="btn" onClick={this.props.signOut}>Sign out</button>
                    </li>
                  </span>
                ) : (<li><Link to={paths.SIGN_IN}>Sign in</Link></li>)
              }
              <li>
                <a className="link link--github" href="https://github.com/r-park/todo-react-redux"></a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  routing: PropTypes.object,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    routing: state.routing
  };
};

export default connect(mapStateToProps)(Header);
