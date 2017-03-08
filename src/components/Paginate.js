import React from 'react'

class Paginate extends React.Component {
  constructor(props){
    super(props)
  }

  handlePaginateUp(){
    this.props.onPaginateUp()
  }

  render(){
    return (
      <button onClick={this.handlePaginateUp}>Hello World</button>
    )
  }//render
} //Paginate

export default Paginate
