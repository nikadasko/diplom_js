import * as React from "react";
import "../styles/login.css";

export class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: props.username || ''
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username.trim();
        if (username) {
            this.props.onLogin(username);
        }
    };

    handleChange = (event) => {
        this.setState({username: event.target.value});
    };

    render() {
        return (
            <div className="container">
                <div className="game-stuffing">
                    <div className="invite-page">
                        <div className="your-name">Your Name</div>
                        <div className="invite">Please enter your name and press «Start Game»</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-name">
                                <input type="text" name="username" size="40" placeholder="Name" value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            <button className="btn-start-game">
                                <span className="btn-start-game-text">Start Game</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
