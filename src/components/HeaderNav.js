import React from 'react';

class HeaderNav extends React.Component{
  constructor(props){
    super(props)

    this.handleSort = this.handleSort.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  handleSort(e){
    this.props.onReOrder(e.target.id, this.props.orderDir);
  }

  handleOrder(e){
    this.props.onReOrder(this.props.orderBy, e.target.id);
  }

  handleSearch(e){
    this.props.doSearch(e.target.value);
  }

  render(){
    return(
      <nav className="navigation navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header"><a className="navbar-brand" href="#">Aprenda Ingles con Rodrigo</a></div>
          <div className="navbar-form navbar-right search-appointments">
              <div className="input-group">
                <input id="SearchApts" onChange={this.handleSearch} placeholder="Search" autoFocus type="text" className="form-control" aria-label="Search Appointments" />
                <div className="input-group-btn">
                  <button type="button" className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span className="caret"></span></button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li><a href="#" onClick={this.handleSort} id="Name">Name {(this.props.orderBy === 'Name')?<span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      {/*<li><a href="#" onClick={this.handleSort} id="aptDate">Date {(this.props.orderBy === 'aptDate')?<span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li><a href="#" onClick={this.handleSort} id="ownerName">Owner {(this.props.orderBy === 'ownerName')?<span className="glyphicon glyphicon-ok"></span>:null}</a></li>*/}
                      <li role="separator" className="divider"></li>
                      <li><a href="#" onClick={this.handleOrder} id="asc">Asc {(this.props.orderDir === 'asc')?<span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                      <li><a href="#" onClick={this.handleOrder} id="desc">Desc {(this.props.orderDir === 'desc')?<span className="glyphicon glyphicon-ok"></span>:null}</a></li>
                    </ul>
                </div>{/* input-group-btn */}
            </div>{/* input-group */}
          </div>{/* navbar-form */}
        </div>{/* container-fluid */}
      </nav>
    )
  }
} //HeaderNav

export default HeaderNav
