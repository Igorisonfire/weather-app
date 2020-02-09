import * as React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';

import './index.scss';

interface IProps {
    children: React.ReactNode
}

interface IState extends ISizes{
    translate: number
    itemsCount: number
    tabIndex: number
    sliderSize: number
}

interface ISizes {
    cardLineWidth: number
    itemWidth: number
    itemsGap: number
}

export default class CardSlider extends React.Component<IProps, IState> {

    private xDown: number = 0;

    state: IState = {
        translate: 0,
        itemsCount: 0,
        tabIndex: 0,
        cardLineWidth: 0,
        itemWidth: 0,
        itemsGap: 0,
        sliderSize: 0,
    };

    componentDidMount(): void {
        const cardLine: HTMLElement | null = document.getElementById('card-line');

        if(cardLine){
            const childItem = cardLine.children[0];
            const itemsGap = parseInt(getComputedStyle(childItem).marginRight);
            const sliderSize = Math.round(cardLine.offsetWidth / (childItem.getBoundingClientRect().width + itemsGap));

            this.setState({
                itemsCount: cardLine.children.length,
                cardLineWidth: cardLine.offsetWidth,
                itemWidth: childItem.getBoundingClientRect().width,
                itemsGap: itemsGap,
                sliderSize: sliderSize
            });

            window.addEventListener('resize', event => {
                const {tabIndex} = this.state;
                const itemsGap = parseInt(getComputedStyle(childItem).marginRight);
                const sliderSize = Math.round(cardLine.offsetWidth / (childItem.getBoundingClientRect().width + itemsGap));

                this.setState({
                    translate: -1 * (childItem.getBoundingClientRect().width + itemsGap) * tabIndex,
                    cardLineWidth: cardLine.offsetWidth,
                    itemWidth: childItem.getBoundingClientRect().width,
                    itemsGap: itemsGap,
                    sliderSize: sliderSize
                });
            }, false);

            cardLine.addEventListener('touchstart', this.handleTouchStart, false);
            cardLine.addEventListener('touchmove', this.handleTouchMove, false);
        }
    }

    //---swipe mobile
    private getTouches = (event: any) => {
        return event.touches
    };

    private handleTouchStart = (event: any) => {
        const firstTouch = this.getTouches(event)[0];
        this.xDown = firstTouch.clientX;
    };

    private handleTouchMove = (event: any) => {
        if(!this.xDown) return;

        let xUp = event.touches[0].clientX;
        let xDiff = this.xDown - xUp;

        if (xDiff > 0) {
            /* left swipe */
            this.nextClick()
        } else {
            /* right swipe */
            this.prevClick()
        }

        this.xDown = 0;
    };
    //---

    private prevClick = () => {
        const {tabIndex, translate, itemWidth, itemsGap} = this.state;

        if(!tabIndex) return;

        this.setState({
            tabIndex: tabIndex - 1,
            translate: translate + itemWidth + itemsGap
        })
    };

    private nextClick = () => {
        const {tabIndex, translate, itemWidth, itemsGap, itemsCount, sliderSize} = this.state;

        if(itemsCount - tabIndex - sliderSize <= 0) return;

        this.setState({
            tabIndex: tabIndex + 1,
            translate: translate - itemWidth - itemsGap
        });
    };

    render() {
        const {tabIndex, itemsCount, sliderSize} = this.state;
        const showNextArrow = itemsCount - tabIndex - sliderSize > 0;

        return (
            <div className={'card-slider-wrapper'}>
                <div className={'buttons-wrapper'}>
                    {tabIndex ?
                    <IconButton onClick={this.prevClick} color="primary">
                        <ArrowBackIcon fontSize={'large'}/>
                    </IconButton> : <div/>}
                    {showNextArrow &&
                    <IconButton onClick={this.nextClick} color="primary">
                        <ArrowForwardIcon fontSize={'large'}/>
                    </IconButton>}
                </div>
                <div className={'card-line-wrapper'}>
                    <div className={'card-line'} id={'card-line'} style={{transform:  `translateX(${this.state.translate}px)`}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

