import React from 'react'

class VideoPlayer extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var videoLocation = this.props.location
    var videoNumber = this.props.name

    return (
      <div>
        <p>
          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#" + videoNumber} aria-expanded="false" aria-controls="collapseExample">
            Show Video
          </button>
        </p>
        <div className="collapse" id={videoNumber}>
          <div className="card card-block">
            <video controls>
              <source src={videoLocation} type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
