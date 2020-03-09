import React, { Component } from 'react';

export class Public extends Component {
    state = {
        message: ""
    }

    componentDidMount() {
        fetch('/public').then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok");
        })
            .then(response => this.setState({ message: response.message }))
            .catch(error => this.setState({ message: error }));
    }
    render() {
        return (
            <div>
                <p>{this.state.message} </p>
            </div>
        );
    }
}

export default Public;
