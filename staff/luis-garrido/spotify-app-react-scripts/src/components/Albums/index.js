import React, { Component } from 'react';
import defaultImage from '../../images/no-image.png'

class Albums extends Component {

    handleAlbumSelection = (id, image, name) => {
        
        this.props.handleTracksSearch(id, image, name)
    }

    render() {
        const { handleAlbumSelection } = this
    
        const res = this.props.albumsLi.map(({ name, images, id }) => {
            const image = images.length!==0?images[0].url:defaultImage
            return (<li key={id} onClick={() => handleAlbumSelection(id, image, name)}>
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

export default Albums