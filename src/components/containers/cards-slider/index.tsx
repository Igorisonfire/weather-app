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
    pageIndex: number
}

interface ISizes {
    cardLineWidth: number
    itemWidth: number
    itemsGap: number
}

export default class CardSlider extends React.Component<IProps, IState> {

    state: IState = {
        translate: 0,
        itemsCount: 0,
        pageIndex: 0,
        cardLineWidth: 0,
        itemWidth: 0,
        itemsGap: 0,
    };

    componentDidMount(): void {
        const cardLine: HTMLElement | null = document.getElementById('card-line');

        if(cardLine){
            const childItem = cardLine.children[0];
            const itemsGap = parseInt(getComputedStyle(childItem).marginRight);

            this.setState({
                itemsCount: cardLine.children.length,
                cardLineWidth: cardLine.offsetWidth,
                itemWidth: childItem.getBoundingClientRect().width,
                itemsGap: itemsGap
            });

            window.addEventListener('resize', event => {
                const {pageIndex} = this.state;

                this.setState({
                    translate: -1 * (childItem.getBoundingClientRect().width + itemsGap) * pageIndex,
                    cardLineWidth: cardLine.offsetWidth,
                    itemWidth: childItem.getBoundingClientRect().width,
                    itemsGap: itemsGap
                });
            }, false);
        }
    }

    private prevClick = () => {
        const {pageIndex, translate, itemWidth, itemsGap} = this.state;

        if(!pageIndex) return;

        this.setState({
            pageIndex: pageIndex - 1,
            translate: translate + itemWidth + itemsGap
        })
    };

    private nextClick = () => {
        const {pageIndex, translate, itemWidth, itemsGap, itemsCount} = this.state;

        if(itemsCount - pageIndex - 3 === 0) return;

        this.setState({
            pageIndex: pageIndex + 1,
            translate: translate - itemWidth - itemsGap
        })
    };

    render() {
        const {pageIndex, itemsCount} = this.state;
        return (
            <div className={'card-slider-wrapper'}>
                <div className={'buttons-wrapper'}>
                    {pageIndex ?
                    <IconButton onClick={this.prevClick} color="primary">
                        <ArrowBackIcon fontSize={'large'}/>
                    </IconButton> : <div/>}
                    {itemsCount - pageIndex - 3 !== 0 &&
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

