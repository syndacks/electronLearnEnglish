import React from 'react'
// import LazyLoad from 'react-lazy-load';
import VidPlayer from './VidPlayer'

class AptList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay() {
      this.props.onPlay(this.props.whichItem);
    }


  render () {
    return (
    //  <LazyLoad>
       <li className="pet-item media">
        <div className="media-left">
          <button className="pet-delete btn btn-xs btn-danger" onClick={this.handlePlay}>
          <span className="glyphicon glyphicon-remove"></span></button>
        </div>
         <div className="pet-info media-body">
           <div className="pet-head">
             <span className="pet-name">{this.props.singleItem.Name}</span>
             <span className="apt-date pull-right">{this.props.singleItem.Number}</span>
           </div>
           <div>
             <VidPlayer
               location={"../data/videos_1_50/"+this.props.singleItem.Filename}
               name={this.props.singleItem.Number}
             />
           </div>
           <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
         </div>
       </li>
      // </LazyLoad>
    )
  }
}

export default AptList
