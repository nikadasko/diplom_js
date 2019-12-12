import * as React from "react";

export class TutorialComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="game-stuffing">
                    <div className="game-description">
                        <div className="image_cards">
                            <img src={require('../images/image-cards.png')} width="276px" height="416px" alt=""/>
                        </div>
                        <div className="memory-game">
                            <div className="how-to-play">How to Play</div>
                            <div className="invite">Memory is counter game where the object is to find pairs.
                                When the game begins, all pictures are hidden.
                            </div>

                            <div className="rules-game">
                                <div className="to-play">To Play</div>
                                <div className="game-items">
                                    <ul>
                                        <li><span>Select two cards to try to match the pictures.</span></li>
                                        <li><span>If you match the pictures you can go again.</span></li>
                                        <li><span>If they don’t match it is the computer turn them.</span></li>
                                        <li><span>The player that finds all pairs wins!</span></li>
                                        <li><span>Have a fun!</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
