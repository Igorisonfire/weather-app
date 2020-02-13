import * as React from 'react';
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { debounce } from 'lodash'

import './index.scss';
import {IRootAppReducerState} from '../../../reducer/model'
import IUi from '../../../reducers/ui/model'
import {setSliderTabIndex} from '../../../actions/set-slider-tab-index'
import {resetSliderTabIndex} from '../../../actions/reset-slider-tab-index'

interface IProps {
    children: React.ReactNode
    uiState: IUi.ModelState
    dispatch: Dispatch
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

class CardSlider extends React.Component<IProps, IState> {

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
        this.sliderFunc();
        window.addEventListener('resize', debounce(this.sliderFunc, 500));
    }

    private sliderFunc = () => {
        const cardLine: HTMLElement | null = document.getElementById('card-line');

        if(cardLine){
            const {tabIndex} = this.state;
            const childItem = cardLine.children[0];
            const itemsGap = parseInt(getComputedStyle(childItem).marginRight);
            const itemWidth = childItem.getBoundingClientRect().width;
            const sliderSize = Math.round(cardLine.offsetWidth / (itemWidth + itemsGap));

            this.setState({
                translate: -1 * (itemWidth + itemsGap) * tabIndex,
                itemsCount: cardLine.children.length,
                cardLineWidth: cardLine.offsetWidth,
                itemWidth: itemWidth,
                itemsGap: itemsGap,
                sliderSize: sliderSize
            });

            cardLine.addEventListener('touchstart', this.handleTouchStart, false);
            cardLine.addEventListener('touchmove', this.handleTouchMove, false);
        }
    };

    //--- swipe mobile
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
            this.nextFunc()
        } else {
            /* right swipe */
            this.prevFunc()
        }

        this.xDown = 0;
    };

    private prevFunc = () => {
        const {tabIndex, translate, itemWidth, itemsGap} = this.state
        const sliderTabIndex = this.props.uiState.sliderTabIndex

        if(!tabIndex) return;

        this.setState({
            tabIndex: tabIndex - 1,
            translate: translate + itemWidth + itemsGap
        })
        this.props.dispatch(setSliderTabIndex(sliderTabIndex-1))
    };

    private nextFunc = () => {
        const {tabIndex, translate, itemWidth, itemsGap, itemsCount, sliderSize} = this.state
        const sliderTabIndex = this.props.uiState.sliderTabIndex

        if(itemsCount - tabIndex - sliderSize <= 0) return;

        this.setState({
            tabIndex: tabIndex + 1,
            translate: translate - itemWidth - itemsGap
        });
        this.props.dispatch(setSliderTabIndex(sliderTabIndex+1))
    };

    componentWillUnmount(): void {
        this.props.dispatch(resetSliderTabIndex())
    }

    render() {
        const {tabIndex, itemsCount, sliderSize} = this.state;
        const showNextArrow = itemsCount - tabIndex - sliderSize > 0;

        return (
            <div className={'card-slider-wrapper'}>
                <div className={'buttons-wrapper'}>
                    {tabIndex ?
                    <IconButton onClick={this.prevFunc} color="primary">
                        <ArrowBackIcon fontSize={'large'}/>
                    </IconButton> : <div/>}
                    {showNextArrow &&
                    <IconButton onClick={this.nextFunc} color="primary">
                        <ArrowForwardIcon fontSize={'large'}/>
                    </IconButton>}
                </div>
                <div className={'card-line-wrapper'}>
                    <div className={'card-line'}
                         id={'card-line'}
                         style={{transform: `translateX(${this.state.translate}px)`}}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ uiState }: IRootAppReducerState) => ({ uiState });

export default connect(mapStateToProps)(CardSlider);


