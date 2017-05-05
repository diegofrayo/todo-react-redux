import {
  List
} from 'immutable';
import React, {
  Component,
  PropTypes
} from 'react';

export class PublicTodoList extends Component {

  render() {
    return (
      <div className="g-row">
        Public Todo List
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

export default PublicTodoList;
