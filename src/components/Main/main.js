import React, {Component} from 'react';
import {Swipeable} from 'react-swipeable'
import './main.css';
import Modal from "../Modal";
import detect from 'detect.js'
import SwipeItem from "../Swipe";

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
        }
        this.maxId = lastItem ?  lastItem.id : 0;
        console.log('maxId', this.maxId);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.items !== prevState.items) {
            localStorage.setItem("items", JSON.stringify(this.state.items));
        }
    }
    componentWillUnmount() {
        // localStorage.removeItem("items")
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
    }
    addComment = (text) => {
        const { items } = this.state;
        const newComment = {
            id:this.commentId++,
            text:text,
            image:"https://via.placeholder.com/40x40?text=imgi"
        };
        const itemIndex = items.map(e => e.id).indexOf(this.state.selectedItemId)
        items[itemIndex].comments.push(newComment)
        localStorage.setItem("items", JSON.stringify(items));
        this.setState({
            items: items
            }
        )
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
    };
    addImage() {
        this.setState({
            counter: this.state.counter + 1,
            itemm: {...this.state.itemm, [this.state.counter]: 'http://lorempixel.com/350/65/'}
        });
    }

    // removeItem(keyOfItemToRemove) {
    //     let nextItems = {};
    //     Object.keys(this.state.itemm).forEach(itemKey => {
    //         if (itemKey !== keyOfItemToRemove) {
    //             nextItems[itemKey] = this.state.itemm[itemKey];
    //         }
    //     });
    //
    //     this.setState({itemm: nextItems});
    // }
    // onRemoval = (id) => {
    //     console.log(    'id', id);
    //     this.setState(({items}) => {
    //         const index = items.findIndex((el) => el.id === id);
    //         console.log('index', index);
    //         // items.splice(index, 1);
    //         const newArr = [
    //             ...items.slice(0, index),
    //             ...items.slice(index + 1)
    //         ];
    //         console.log('newArr', newArr);
    //         localStorage.setItem("items", JSON.stringify(newArr));
    //         return {
    //             items:newArr
    //         };
    //
    //     }, ()=>{
    //         console.log(this.state.items)
    //     });
    // }

    swiping(e, deltaX, deltaY, absX, absY, velocity) {
        console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    }

    swipingLeft(e, absX) {
        console.log("You're Swiping to the Left...", e, absX)
    }
    onSwipedLeft(e, absX) {
        e.event.target.parentNode.parentNode.classList.add("options");
        console.log("LLLL...", e, absX)
    }
    onSwipedRight(e, absX) {
        e.event.target.parentNode.parentNode.classList.remove("options");
        console.log("RRRR...", e, absX)
    }

    swiped(e, deltaX, deltaY, isFlick, velocity) {
        console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
    }

    swipedUp(e, deltaY, isFlick) {
        console.log("You Swiped Up...", e, deltaY, isFlick)
    }
    onSwiping = () => {
        console.log('-----');
    }

    render() {
        const links = this.state.items.map((item) => {
            return (
                // <SwipeItem onRemoval={() => this.onRemoval(item.id)}>
                <Swipeable
                    onSwiping={this.swiping}
                    onSwipingLeft={this.swipingLeft}
                    onSwipedLeft={this.onSwipedLeft}
                    onSwipedRight={this.onSwipedRight}
                    onSwiped={this.swiped}
                    onSwipedUp={this.swipedUp} >
                    <div className="item-info">
                        <div className="item-info-wrapper">
                            <div className="item-text"
                                 data-id={item.id}
                                 onClick={() => this.openModal('comment', item.id, item.title, item.comments)}
                                 style={{paddingRight: item.comments.length > 0 ? '75px' :'10px'}}
                            >
                                {item.title}
                            </div>
                            { item.comments.length > 0 &&
                            <div className="item-count">
                                {item.comments.length}
                            </div>
                            }
                        </div>
                        <div className="optional-del">
                            <button className="btn-del" onClick={() => this.deleteItem(item.id)}>
                                Del
                            </button>
                        </div>


                    </div>
                    </Swipeable>
                // </SwipeItem>
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
                        <div onClick={()=>this.openModal('item')}  className="plus-circle"></div>
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