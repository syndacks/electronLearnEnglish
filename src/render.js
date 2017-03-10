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
import {Router, Route, hashHistory} from 'react-router';

import VidList from './components/VidList';
import Toolbar from './components/Toolbar';
import VidPlayer from './components/VidPlayer';
import Paginate from './components/Paginate';
import HeaderNav from './components/HeaderNav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aptBodyVisible: false,
      myAppointments: loadApts,
      orderBy: 'Name',
      orderDir: 'asc',
      queryText: ''
    };

    this.toggleAptDisplay = this.toggleAptDisplay.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.reOrder = this.reOrder.bind(this);
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

  // addItem(tempItem){
  //   var tempApts = this.state.myAppointments;
  //   tempApts.push(tempItem);
  //   this.setState({
  //     myAppointments: tempApts,
  //     aptBodyVisible: false
  //   })
  // } //addItem

  reOrder(orderBy, orderDir){
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    })
  }

  searchApts(query){
    this.setState({
      queryText: query
    })
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
    var filteredApts = [];
    var queryText = this.state.queryText;

    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;


    var myAppointments = this.state.myAppointments;

    if(this.state.aptBodyVisible === true) {
      $('#addAppointment').modal('show');
    } else {
      $('#addAppointment').modal('hide');
    }

    for(var i=0; i<myAppointments.length; i++){
      if(
        (myAppointments[i].Name.toLowerCase().indexOf(queryText)!=-1)
        // (myAppointments[i].ownerName.toLowerCase().indexOf(queryText)!=-1) ||
        // (myAppointments[i].aptDate.toLowerCase().indexOf(queryText)!=-1) ||
        // (myAppointments[i].aptNotes.toLowerCase().indexOf(queryText)!=-1)||
      ) {
        filteredApts.push(myAppointments[i]);
      }
    }

    filteredApts = _.orderBy(filteredApts, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir); //orderArray



    filteredApts = filteredApts.map(function(item, index){
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

        <HeaderNav
          doSearch = {this.searchApts}
          onReOrder = {this.reOrder}
          orderBy = {this.state.orderBy}
          orderDir = {this.state.orderDir}
        />

        <div className="interface">
        <Toolbar
          handleToggle = {this.toggleAptDisplay}
          handleAbout = {this.showAbout}
        />

          <div className="container">
           <div className="row">
             <div className="appointments col-sm-12">
              {/*<h2 className="appointments-headline">Choose a video</h2> */}
               <ul className="item-list media-list"> {filteredApts}</ul>
             </div>{/* col-sm-12 */}
           </div>{/* row */}

           <Paginate
             onPaginateUp={this.movePageUp}
             />

          </div>{/* container */}
        </div>

        // </div>
    );
  }
}

ReactDOM.render((

  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>

), document.getElementById('petAppointments'));
