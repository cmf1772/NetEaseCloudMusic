import React from 'react';

class Index extends React.PureComponent{
  render() {
    return (
        <div>
          {this.props.match.path}
        </div>
      )
  }
}
export default Index;
