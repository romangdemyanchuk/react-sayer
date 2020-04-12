// import React from 'react';
// import './Swipe.css'
// export default class SwipeItem extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             left: 0,
//             right:0,
//             originalOffset: 0,
//             velocity: 0,
//             timeOfLastDragEvent: 0,
//             touchStartX: 0,
//             prevTouchX: 0,
//             beingTouched: false,
//             height: 0,
//             intervalId: null
//         };
//     }
//
//     componentDidMount() {
//         window.setTimeout(() => this.setState({height: 56}), 50);
//     }
//
//     animateSlidingToZero() {
//         let {left,right, velocity, beingTouched} = this.state;
//         if (!beingTouched && left < -0.01) {
//             velocity += 10 * 0.033;
//             left += velocity;
//             if (!beingTouched && right > 0.01) {
//                 velocity -= 10 * 0.033;
//                 right -= velocity;
//             }
//             if (left < -120) {
//                 window.clearInterval(this.state.intervalId);
//                 this.handleRemoveSelf();
//                 console.log(3)
//             }
//             if (right > 250) {
//                 window.clearInterval(this.state.intervalId);
//                 this.handleRemoveSelf();
//             }
//             this.setState({left, velocity});
//         } else if (!beingTouched) {
//             left = 0;
//             right = 0;
//             velocity = 0;
//             window.clearInterval(this.state.intervalId);
//             this.setState({left, velocity, right, intervalId: null, originalOffset: 0});
//         }
//     }
//
//     handleRemoveSelf() {
//         console.log('handleRemoveSelf')
//         this.setState({height: 0});
//         this.props.onRemoval();
//     }
//
//     handleStart(clientX) {
//         if (this.state.intervalId !== null) {
//             window.clearInterval(this.state.intervalId);
//         }
//         this.setState({
//             originalOffset: this.state.left,
//             velocity: 0,
//             timeOfLastDragEvent: Date.now(),
//             touchStartX: clientX,
//             beingTouched: true,
//             intervalId: null
//         });
//     }
//
//     handleMove(clientX) {
//         if (this.state.beingTouched) {
//             const touchX = clientX;
//             const currTime = Date.now();
//             const elapsed = currTime - this.state.timeOfLastDragEvent;
//             const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
//             let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
//             if (deltaX < -350) {
//                 console.log(1)
//                 this.handleRemoveSelf();
//             } else if (deltaX > 350) {
//                 deltaX = 0;
//                 console.log(2)
//             }
//             this.setState({
//                 left: deltaX,
//                 velocity,
//                 timeOfLastDragEvent: currTime,
//                 prevTouchX: touchX
//             });
//         }
//     }
//
//     handleEnd() {
//         this.setState({
//             velocity: this.state.velocity,
//             touchStartX: 0,
//             beingTouched: false,
//             intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33)
//         });
//     }
//
//     handleTouchStart(touchStartEvent) {
//         touchStartEvent.preventDefault();
//         // this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
//     }
//
//     handleTouchMove(touchMoveEvent) {
//         this.handleMove(touchMoveEvent.targetTouches[0].clientX);
//     }
//
//     handleTouchEnd() {
//         this.handleEnd();
//     }
//
//     handleMouseDown(mouseDownEvent) {
//         mouseDownEvent.preventDefault();
//         this.handleStart(mouseDownEvent.clientX);
//     }
//
//     handleMouseMove(mouseMoveEvent) {
//         this.handleMove(mouseMoveEvent.clientX);
//     }
//
//     handleMouseUp() {
//         this.handleEnd();
//     }
//
//     handleMouseLeave() {
//         this.handleMouseUp();
//     }
//
//     render() {
//         return (
//             <li
//                 className="swipeItem"
//                 style={{height: this.state.height + 'px', transition: 'height 250ms ease-in-out'}}
//                 onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
//                 onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
//                 onTouchEnd={() => this.handleTouchEnd()}
//                 // The following event handlers are for mouse compatibility:
//                 onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
//                 onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
//                 onMouseUp={() => this.handleMouseUp()}
//                 onMouseLeave={() => this.handleMouseLeave()}
//             >
//                 <div
//                     className="swipeItem-content"
//                     style={{left: this.state.left + 'px'}}
//                 >
//                     {this.props.children}
//                 </div>
//             </li>
//         );
//     }
// }