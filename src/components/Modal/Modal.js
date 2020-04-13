import React, {Component} from 'react';
import Modal from "react-modal";
import './Modal.css';

export default class ModalWindow extends Component {
    state = {
        comment:''
    };
    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    };
    onSubmitComment = (e) => {
        e.preventDefault();
        this.props.addComment(this.state.comment);
        this.setState({
            comment:''
        })
    };

    render() {
        const {modalIsOpen, closeModal, onLabelChange, onSubmit,
            modalType, modalTitle, comments} = this.props;
        const allComments = comments && comments.map((item) => {
            return (
                <div className="comment-info">
                    <img src={item.image} alt='img'/>
                    <div className="comment-text">
                        {item.text}
                    </div>
                </div>
            );
        });
        const customStyles = {
            content : {
                top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
                transform: 'translate(-50%, -50%)', border:'none', width: '280px', height: '450px'
            }
        };
        const commentModalBody = <div className="main">
            <div className="info">
                <div className="header-arrow"
                     onClick={closeModal}>
                    <i className="fa fa-arrow-left"/>
                </div>
                <div className="item-title">
                    {modalTitle}
                </div>
            </div>
            <div className="all-comments">
                <div className="all-comments-info">
                    {allComments}
                </div>
            </div>
            <form className="input-info items-info"
                  onSubmit={this.onSubmitComment}>
                <input className="comment" type="text" name="item" placeholder="New comment goes here.."
                       onChange={this.onCommentChange}
                       value={this.state.comment}/>
                <button className="input-btn item-btn">
                    <i className="fa fa-angle-right"/>
                </button>
            </form>
        </div>;
        const itemModalBody = <div className="main">
            <div className="info">
                <div  className="header-arrow"
                      onClick={closeModal}>
                    <i className="fa fa-arrow-left"/>
                </div>
                <div className="item-title">
                    Create new item
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="input-info">
                    <input type="text" name="item" placeholder="New item title.."
                           onChange={onLabelChange}/>
                    <button className="input-btn">
                        <i className="fa fa-angle-right"/>
                    </button>
                </div>
            </form>
        </div>;
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                {
                    modalType==="comment" ? commentModalBody : itemModalBody
                }
            </Modal>
        );
    }
};