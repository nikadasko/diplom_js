import * as React from 'react';
import './styles/global.css';
import './styles/menu.css';
import './styles/how_to_play.css';

import { LoginComponent } from "./components/login";
import { GameComponent } from "./components/game";
import { LeaderboardComponent } from "./components/leaderboard";
import { addToList } from "./storage";
import { TutorialComponent } from "./components/tutorial";

export function dtToFormat(dt) {
    const hour = ('0' + Math.floor(dt / 60 / 60 / 1000)).substr(-2);
    const min = ('0' + Math.floor(dt / 60 / 1000)).substr(-2);
    const sec = ('0' + Math.floor(dt / 1000)).substr(-2);
    const pre = hour !== '00' ? hour + '' : '';
    return pre + `${min}:${sec}`;
}

export default class App extends React.Component {

    interval = undefined;
    state = {
        navigation: 'tutorial',
        level: '8x3',
        username: '',
        backId: 1,
        time_start: 0,
        time: ''
    };

    onNewGame = () => {
        if (this.state.navigation !== 'login') {
            this.setState({navigation: 'login'});
        }
    };

    onSelectLevel = (event) => {
        this.setState({level: event.target.value});
    };

    onSelectBack = (event) => {
        this.setState({backId: event.target.value * 1});
    };

    showLeaderboard = () => {
        this.setState({navigation: 'leaderboard'})
    };

    onLogin = (username) => {
        this.setState({navigation: 'game', username});
    };

    onGameStart = () => {
        this.setState({time_start: Date.now(), time: '00:00'}, () => {
            this.interval = setInterval(() => {
                this.setState({time: dtToFormat(Date.now() - this.state.time_start)})
            }, 1000);
        })
    };

    onWin = () => {
        clearInterval(this.interval);
        addToList({
            name: this.state.username,
            time: Date.now() - this.state.time_start
        });
        this.setState({
            navigation: 'leaderboard'
        });
    };

    render() {
        return (
            <>
                <div className="menu">
                    <div className="container">
                        <a onClick={this.onNewGame} href="#" className="button-new-game">
                            <span className="button-game">New Game</span>
                        </a>

                        { this.state.navigation === 'game' ? (
                            <div className="timer">
                                {this.state.time}
                            </div>
                        ) : null }

                        <div className="settings">
                            <div onClick={this.showLeaderboard} className="rating-img">
                                <img src={require('./images/rating.png')} width="30" height="22" alt=""/>
                            </div>
                            <div className="popup-list">
                                <select
                                    onChange={this.onSelectLevel}
                                    defaultValue='8x3'
                                    disabled={this.state.navigation !== 'login' && this.state.navigation !== 'tutorial'}
                                    className="window-size"
                                >
                                    <option value="8x3">Height (8x3)</option>
                                    <option value="5x3">Medium (5x3)</option>
                                    <option value="5x2">Low (5x2)</option>
                                </select>
                            </div>
                            <div className="window-img">
                                <form action='#'>
                                    <select
                                        onChange={this.onSelectBack}
                                        defaultValue="0"
                                        className="img-size"
                                        disabled={this.state.navigation !== 'login' && this.state.navigation !== 'tutorial'}
                                    >
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <main>
                    { this.renderContent() }
                </main>
            </>
        );
    }

    renderContent() {
        switch (this.state.navigation) {
            case "login":
                return <LoginComponent username={this.state.username} onLogin={this.onLogin}/>;
            case "game":
                return <GameComponent backId={this.state.backId} level={this.state.level} onGameStart={this.onGameStart} win={this.onWin}/>;
            case "leaderboard":
                return <LeaderboardComponent/>;
            case "tutorial":
                return <TutorialComponent/>;
            default:
                return null;
        }
    }
}
