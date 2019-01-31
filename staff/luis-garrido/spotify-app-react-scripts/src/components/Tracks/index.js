import React, { Component } from 'react';

class Tracks extends Component {
    
    render() {
        const res = this.props.tracksLi.map(({ id, duration_ms, preview_url, name }) => {
            const time = parseInt(duration_ms/(1000*60)%60) + ":" + (parseInt((duration_ms/1000)%60)>9?parseInt((duration_ms/1000)%60):"0"+parseInt((duration_ms/1000)%60))
            return (<li key={id} data-preview={preview_url}>
                <audio controls>
                    <source src={preview_url} type="audio/mpeg" controls />Your browser does not support the audio tag.</audio> {time} - {name}
                </li>)
        })

        return <section className="trackList container">
            <div className="trackListCover">
                <div className="trackListCover__image">
                    <img src={this.props.cover} className="cards__image" height="100%"/>
                </div>
                <div className="trackListCover__name">
                        <p>{this.props.albumName}</p>
                </div>
            </div>
            <ul>{res}</ul>
        </section>
    }
}

export default Tracks