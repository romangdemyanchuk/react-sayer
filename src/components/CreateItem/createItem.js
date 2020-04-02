// import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import './createItem.css';
//
// export default class CreateItem extends Component {
//     state = {
//         title:''
//     };
//
//     onLabelChange = (e) => {
//         this.setState({
//             title:e.target.value
//         });
//     };
//     onSubmit = (e) => {
//         e.preventDefault();
//         this.props.onItemAdded(this.state.title);
//     }
//     render() {
//         return (
//             <div className="jumbotron jumbotron-fluid jumbotron-custom">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col">
//                             <div className="main">
//                                 <div className="info">
//                                     <Link to="/main" className="header-arrow">
//                                         <i className="fa fa-arrow-left"></i>
//                                     </Link>
//                                     <div className="item-title">
//                                         Create new item
//                                     </div>
//                                 </div>
//                                 <form onSubmit={this.onSubmit}>
//                                     <div className="input-info">
//                                         <input type="text" name="item" placeholder="New item title.."
//                                                onChange={this.onLabelChange}/>
//                                         <div className="input-btn">
//                                             <i className="fa fa-angle-right"></i>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };