import "../styles/card.css";
import * as React from "react";

const back = [
    require('../images/back/back-card-1.png'),
    require('../images/back/back-card-2.png'),
    require('../images/back/back-card-3.png'),
    require('../images/back/back-card-4.png'),
];

const pictures = [
    require('../images/picture/image-card-1.png'),
    require('../images/picture/image-card-2.png'),
    require('../images/picture/image-card-3.png'),
    require('../images/picture/image-card-4.png'),
    require('../images/picture/image-card-5.png'),
    require('../images/picture/image-card-6.png'),
    require('../images/picture/image-card-7.png'),
    require('../images/picture/image-card-8.png'),
    require('../images/picture/image-card-9.png'),
    require('../images/picture/image-card-10.png'),
    require('../images/picture/image-card-11.png'),
    require('../images/picture/image-card-12.png'),
];

// https://ru.wikipedia.org/wiki/Тасование_Фишера_—_Йетса
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export class GameComponent extends React.Component {

    constructor(props) {
        super(props);

        const param = props.level.split('x');
        const rows = Number(param[1]);
        const cells = Number(param[0]);
        const count = param[0] * param[1];
        const cards = [];
        let list = [];

        for (let i = 0; i < count; i += 2) {
            const picIndex = i * 0.5 - pictures.length * Math.floor(i * 0.5 / pictures.length);
            list[i] = pictures[picIndex];
            list[i + 1] = pictures[picIndex];
        }

        shuffle(list);

        for (let i = 0; i < rows; i++) {
            cards.push(list.slice(i * cells, i * cells + cells));
        }

        this.state = {
            count: count,
            cards: cards,
            selected: [],
            opened: [],
            backId: props.backId,
            startTimeStamp: Date.now()
        };
    }

    componentDidMount() {
        this.props.onGameStart();
    }

    onSelect = (row, cell, src) => {
        this.setState((state, props) => {
            if (state.selected.length < 2) {
                state.selected.push({
                    key: `${row}${cell}`,
                    value: src
                });
            } else {
                if (state.selected[0].value === state.selected[1].value) {
                    state.opened.push(state.selected[0].key, state.selected[1].key);
                }
                if (state.opened.length === state.count) {
                    props.win(state.startTimeStamp);
                }
                state.selected = [];
            }
            return state;
        });
    };

    isSelected = (key) => {
        return this.state.selected.findIndex((el) => el.key === key) > -1 ? 'selected' : '';
    };

    isOpened = (key) => {
        return this.state.opened.includes(key) ? 'open' : '';
    };

    render() {
        return (
            <div className="container">
                {
                    this.state.cards.map((row, i) => (
                        <div key={i} className="game-row">
                            {
                                row.map((src, j) => (
                                    <div
                                        key={`${i}${j}`}
                                        onClick={() => this.onSelect(i, j, src)}
                                        className={
                                            `card-selection ${this.isSelected(`${i}${j}`)} ${this.isOpened(`${i}${j}`)}`
                                        }
                                    >
                                        <div className="card-selection-value">
                                            <img src={src} alt=""/>
                                        </div>
                                        <div className="card-selection-back">
                                            <img src={back[this.state.backId]} alt=""/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}
