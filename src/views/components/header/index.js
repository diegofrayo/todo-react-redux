import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({authenticated, signOut}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title">Todo React Redux</h1>

          <ul className="header__actions">
            <li>
              <Link to="/public">Public To Do Lists</Link>
            </li>
            { authenticated ?
              ( <li>
                  <button className="btn" onClick={signOut}>Sign out</button>
                </li> ) : null
            }
            <li>
              <a className="link link--github" href="https://github.com/r-park/todo-react-redux"></a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
