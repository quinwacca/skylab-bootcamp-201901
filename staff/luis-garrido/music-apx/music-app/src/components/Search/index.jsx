'use strict'

import React, { useState } from 'react'
import './index.sass'

function Search({ onSearch, title }) {
// class Search extends Component {
    
    const [ query, setQuery ] = useState('')
    // state = { query: '' }

    const handleQueryInput = event => setQuery(event.target.value)
    // const handleQueryInput = ({ target: { value: query } }) => this.setState({ query })

    const handleSearchSubmit = event => {
        event.preventDefault()
        console.log(query)
        onSearch(query)
    }

    // handleSearchSubmit = event => {
    //     event.preventDefault()

    //     onSearch(query)
    // }

    return (
    <section className="search">
        <h2>{title}</h2>

        <form onSubmit={handleSearchSubmit}>
            <input type="text" placeholder="Search an artist..." onChange={handleQueryInput} />
            <button type="submit">Search</button>
        </form>
    </section>
    )
}

export default Search