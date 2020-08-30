import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { boolean, number } from '@storybook/addon-knobs';

const tooglesGroupId = 'Toggles';
const valuesGroupId = 'Values';

const getConfigurableProps = () => ({
    showArrows: boolean('showArrows', true, tooglesGroupId),
    showStatus: boolean('showStatus', true, tooglesGroupId),
    showIndicators: boolean('showIndicators', true, tooglesGroupId),
    infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
    showThumbs: boolean('showThumbs', false, tooglesGroupId),
    useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    autoPlay: boolean('autoPlay', true, tooglesGroupId),
    stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    swipeable: boolean('swipeable', true, tooglesGroupId),
    dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
    emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    interval: number('interval', 3000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
});
 
export default class CarouselComponent extends Component {
    render() {
        return (
            <Carousel {...getConfigurableProps()}>
                <div>
                    <img src="./slider/pizza.jpeg" alt=""/>
                    <h1 className="legend">Welcome to Yummi Pizza!</h1>
                </div>
                <div>
                    <img src="./slider/pizza2.jpg" alt=""/>
                    <h1 className="legend">Order now!</h1>
                </div>
                <div>
                    <img src="./slider/pizza3.jpg" alt=""/>
                    <h1 className="legend">Enjoy your pizza!</h1>
                </div>
            </Carousel>
        );
    }
};