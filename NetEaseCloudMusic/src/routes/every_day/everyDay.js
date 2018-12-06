import React from 'react';

class EveryDay extends React.PureComponent{
  render() {
    return (
        <div>
          {this.props.match.path}
        </div>
      )
  }
}
export default EveryDay;
