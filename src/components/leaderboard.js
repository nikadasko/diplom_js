import "../styles/leaderboard.css";
import * as React from "react";
import { getList } from "../storage";
import { dtToFormat } from "../App";

export class LeaderboardComponent extends React.Component {

    state = {
        list: []
    };

    componentDidMount() {
        this.setState({ list: getList() });
    }

    render() {
        return (
            <div className="container">
                <div className="game-stuffing">
                    <div className="leader-board">Leader Board</div>
                    <div className="leader-list">
                        <ul>
                            {
                                this.state.list.map((el, index) => (
                                    <li key={el.name + index}>
                                        <span className="circle">{ index + 1 }</span>
                                        <span className="leader-name">{ el.name }</span>
                                        <span className="timer-number">{ dtToFormat(el.time) }</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
