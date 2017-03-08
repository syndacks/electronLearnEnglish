import React from 'react'

class Toolbar extends React.Component {
  constructor (props) {
    super (props);

    this.state = {}

    this.toggleAbout = this.toggleAbout.bind(this);
    // bind anything relevant here
  };

  toggleAbout () {
    this.props.handleAbout();
  }

  toggle1_50() {
    this.props.toggle1_50();
  }

  render () {
    return (
      <div className = "toolbar">

        <div className="toolbar-item" onClick={this.toggle1_50}>
          <span className="toolbar-item-button glyphicon glyphicon-tasks"></span>
          <span className="toolbar-item-text">Videos 1-50</span>
        </div>

        <div className="toolbar-item" onClick="">
          <span className="toolbar-item-button glyphicon glyphicon-tasks"></span>
          <span className="toolbar-item-text">Videos 51-100</span>
        </div>

        <div className="toolbar-item" onClick="">
          <span className="toolbar-item-button glyphicon glyphicon-tasks"></span>
          <span className="toolbar-item-text">Videos 101-150</span>
        </div>

        <div className="toolbar-item" onClick="">
          <span className="toolbar-item-button glyphicon glyphicon-tasks"></span>
          <span className="toolbar-item-text">Videos 151-200</span>
        </div>

        <div className="toolbar-item" onClick={this.toggleAbout}>
          <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
          <span className="toolbar-item-text">About this app</span>
        </div>

      </div>


    ) //return
  } //render
}; //Toolbar

export default Toolbar
