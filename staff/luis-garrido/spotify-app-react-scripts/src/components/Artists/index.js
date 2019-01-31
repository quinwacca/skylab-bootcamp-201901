import React, { Component } from 'react';
import defaultImage from '../../images/no-image.png'

class Artists extends Component {
    state = { id: '' }

    handleArtistSelection = id => {
        this.props.handleAlbumSearch(id)
    }

    render() {
        const { handleArtistSelection } = this
        console.log(defaultImage)
        const res = this.props.artistsLi.map(({ name, images, id }) => {
            const image = images.length!==0?images[0].url:defaultImage
            return (<li key={id} onClick={() => handleArtistSelection(id)}>
                    <div className="cards">
                        <div className="cards__image">
                            <img src={image} height="100%" />
                        </div>
                        <div className="cards__name">
                            <p>{name}</p>
                        </div>
                    </div>
                </li>)})
        
        return <section className="results">
            <ul className="list">{res}</ul>
        </section>
    }
}

export default Artists