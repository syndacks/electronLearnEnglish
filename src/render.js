var $ = global.jQuery = require('jquery');
require('bootstrap');
var _ = require('lodash');
var fs = require('fs');
var dataLocation = require('path').resolve(__dirname, '..', 'data', 'videos_1_50', 'data_backup.json');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

var electron = require('electron');
var ipc = electron.ipcRenderer;

import React from 'react';
import ReactDOM from 'react-dom';
import VidList from './components/VidList';
import Toolbar from './components/Toolbar';
import VidPlayer from './components/VidPlayer';
import Paginate from './components/Paginate'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aptBodyVisible: false,
      myAppointments: loadApts
    };

    this.playMessage = this.playMessage.bind(this);
    this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
  }

  componentDidUpdate() {
    fs.writeFile(dataLocation, JSON.stringify(this.state.myAppointments), 'utf8',
      function(err){
        if (err) {
          console.log(err);
        }
      });
  }

  toggleAptDisplay() {
    var tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility
    })
  } //toggleAptDisplay

  showAbout () {
    // will send an event to Electron's main process
    ipc.sendSync('openInfoWindow');
  }

  playMessage(item){
    return(
      <VidPlayer />
    )
  } //playMessage

  movePageUp(){

  }


  // playMessage(item){
  //   var allApts = this.state.myAppointments;
  //   var newApts = _.without(allApts, item);
  //   this.setState({
  //     myAppointments: newApts
  //   }); //setState
  // } //playMessage

  render() {
    // set the state of this component to "myAppointments"
    var myAppointments = this.state.myAppointments;

    if(this.state.aptBodyVisible === true) {
      $('#addAppointment').modal('show');
    } else {
      $('#addAppointment').modal('hide');
    }

    myAppointments = myAppointments.map(function(item, index){
      if(index<21){
      return (
        < VidList
            key = {index}
            singleItem = {item}
            whichItem = {item}
            onPlay = {this.playMessage}
        />
      )
    } // return
    }.bind(this)); //Appointments.map

    return (
      <div className="application">
        <div className="interface">
        <Toolbar
          handleToggle = {this.toggleAptDisplay}
          handleAbout = {this.showAbout}
        />

          <div className="container">
           <div className="row">
             <div className="appointments col-sm-12">
               <h2 className="appointments-headline">Aprenda Ingles con Rodrigo</h2>
               <ul className="item-list media-list"> {myAppointments}</ul>
             </div>{/* col-sm-12 */}
           </div>{/* row */}

           <Paginate
             onPaginateUp={this.movePageUp}
             />

          </div>{/* container */}
        </div>

        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('petAppointments'));
