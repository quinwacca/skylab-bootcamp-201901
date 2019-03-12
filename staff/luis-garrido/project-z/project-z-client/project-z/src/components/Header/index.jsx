import React, { Fragment, useState } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Header = props => {
    const [query, setQuery] = useState("");

    const handleQueryInput = ({ target: { value: query } }) => {
        setQuery(query);
    };

    const handleSearchSubmit = event => {
        event.preventDefault();
        const _query = query;
        setQuery("");
        props.history.push(`/search/${_query}`);
    };

    return (
        <Fragment>
            <form className="search" onSubmit={handleSearchSubmit}>
                <input
                    className="search__input"
                    type="text"
                    name="query"
                    placeholder="Search..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={query}
                    onChange={handleQueryInput}
                />
            </form>
        </Fragment>
    );
};

export default withRouter(Header);
