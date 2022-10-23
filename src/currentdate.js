import React from 'react';

export class currentDate extends React.Component {
    constructor() {
        super();

        let today = new Date()
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div>
                {this.state.date}
            </div>
            
        );
    }
}