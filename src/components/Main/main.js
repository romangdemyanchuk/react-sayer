import React, {Component} from 'react';
import {Swipeable} from 'react-swipeable'
import './main.css';
import Modal from "../Modal/Modal";
import detect from 'detect.js'

export default class Main extends Component {
    constructor(props) {
        super(props);
        let user = detect.parse(navigator.userAgent);
        this.isMobile = user.device.type === 'Mobile';
        document.getElementById('root').classList.add(this.isMobile ? 'mobile' : 'desktop');
        this.items = [
            {
                "id":0,
                "title":"First item with customized long title",
                "comments": [
                    {
                        "id": 0,
                        "image":"https://via.placeholder.com/40x40?text=img1",
                        "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                            " sed do eiusmod sed do eiusmod consectetur"
                    },
                    {
                        "id": 1,
                        "image":"https://via.placeholder.com/40x40?text=img2",
                        "text":"Ut enim ad minim veniam, quis nostrud exercitation" +
                            " ullamco "
                    },
                    {
                        "id": 2,
                        "image":"https://via.placeholder.com/40x40?text=img3",
                        "text":"Duis aute irure dolor in reprehenderit in voluptate" +
                            " "
                    }
                ]
            },
        ];
        const localItems = localStorage.getItem("items");
        !localItems && localStorage.setItem("items", JSON.stringify(this.items));
        const items = localItems ? JSON.parse(localItems) : this.items;
        const lastItem = items[items.length - 1];
        this.state = {
            modalIsOpen: false,
            items: items,
            modalType:null,
            selectedItemId:null,
            selectedItemTitle:null,
            selectedItemComment:null,
            counter: 1
        };
        this.maxId = lastItem ?  lastItem.id : 0;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.items !== prevState.items) {
            localStorage.setItem("items", JSON.stringify(this.state.items));
        }
    }
    openModal = (type, itemId, itemTitle, itemComment) => {
        this.setState({
            modalIsOpen: true,
            modalType: type,
            selectedItemId: itemId,
            selectedItemTitle: itemTitle,
            selectedItemComment:itemComment
        });
    };
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };
    state = {
        label:''
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.addItem(this.state.label);
        this.closeModal();
    };
    addItem = (text) => {
        const newItem = {
            title:text,
            id:++this.maxId,
            comments:[]
        };
        this.setState(({items}) =>{
            const newArr = [
                ...items,
                newItem
            ];
            return {
                items:newArr
            }
        })
    };
    addComment = (text) => {
        const { items } = this.state;
        const newComment = {
            id:this.commentId++,
            text:text,
            image:"https://via.placeholder.com/40x40?text=imgi"
        };
        const itemIndex = items.map(e => e.id).indexOf(this.state.selectedItemId);
        items[itemIndex].comments.push(newComment);
        localStorage.setItem("items", JSON.stringify(items));
        this.setState({
            items: items
            }
        )
    };
    deleteOptionsClass() {
        const elems = document.querySelectorAll(".options");
        [].forEach.call(elems, function(el) {
            el.classList.remove("options");
        });
    }
    deleteItem = (id) => {
        this.setState(({items}) => {
            const index = items.findIndex((el) => el.id === id);
            const newArr = [
                ...items.slice(0, index),
                ...items.slice(index +1)
            ];
            return {
                items:newArr
            };
        });
        this.deleteOptionsClass();
    };
    onSwipedLeft = (e) => {
        this.deleteOptionsClass();
        e.event.target.parentNode.parentNode.classList.add("options");
    };
    onSwipedRight = (e) => {
        e.event.target.parentNode.parentNode.classList.remove("options");
    };

    render() {
        const links = this.state.items.map((item) => {
            return (
                <Swipeable
                    onSwipedLeft={this.onSwipedLeft}
                    onSwipedRight={this.onSwipedRight} >
                    <div className="item-info">
                        <div className="item-info-wrapper">
                            <div className="item-text"
                                 data-id={item.id}
                                 onClick={() => this.openModal('comment', item.id, item.title, item.comments)}
                                 style={{paddingRight: (item.comments.length > 0) ? '75px' :'10px'}}
                            >
                                {item.title}
                            </div>
                            { (item.comments.length > 0) &&
                            <div className="item-count">
                                {item.comments.length}
                            </div>
                            }
                        </div>
                        <div className="optional-del">
                            <button className="btn-del" onClick={() => this.deleteItem(item.id)}>
                                { this.isMobile ?
                                'Delete' : <i className="fa fa-times"/>
                                }
                            </button>
                        </div>
                    </div>
                </Swipeable>
            )
        });
        return (
                <div className="main-block">
                    <div className="header-info">
                        <div className="header-title">
                            Sayer
                        </div>
                        <div className="header-subtitle">
                            World's most used time waster
                        </div>
                    </div>
                    <div className="main-info">
                        <div className="items">
                            {links}
                        </div>
                        <div onClick={()=>this.openModal('item')}  className="plus-circle"/>
                    </div>
                    < Modal modalIsOpen={this.state.modalIsOpen}
                            closeModal={this.closeModal}
                            onLabelChange={this.onLabelChange}
                            onSubmit={this.onSubmit}
                            modalType={this.state.modalType}
                            modalTitle={this.state.selectedItemTitle}
                            selectedItemId={this.state.selectedItemId}
                            comments={
                                this.state.selectedItemComment
                            }
                            addComment={this.addComment}
                    />
                </div>
        );
    }
};