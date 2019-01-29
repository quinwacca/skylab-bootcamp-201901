class Title extends React.Component {
    render() {
      return <h1>{this.props.title}</h1>;
    }
  }
  
  class App extends React.Component {
    state = { artists: null };
    updateArtists = artists =>
     this .setState({ artists }, () => console.log(this.state.artists));
    render() {
      return (
        <main>
          <Title title="My Spotify App" />
          <SearchPanel updateArtists={this.updateArtists} />
          <ArtistPanel artists={this.state.artists} />
        </main>
      );
    }
  }
  
  class SearchPanel extends React.Component {
    state = { query: "" };
    handleChange = event => this.setState({ query: event.target.value });
    handleFormSubmit = event => {
      event.preventDefault();
      try {
        logic.searchArtists(this.state.query, (error, artists) => {
          if (error) {
            console.log("error", error);
          } else {
            if (artists.length === 0) {
              console.log("No he oído este artista en mi vida Hulio");
            } else {
              this.props.updateArtists(artists);
            }
          }
        });
      } catch (err) {}
    };
    render() {
      return (
        <section className="search container">
          <h2>Search</h2>
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              value={this.state.query}
              onChange={this.handleChange}
              name="query"
              placeholder="Search an artist..."
            />
            <button type="submit">Search</button>
            <div className="error__search" />
          </form>
        </section>
      );
    }
  }
  
  class ArtistPanel extends React.Component {
    render() {
      return (
        <section className="results container">
          <h3>Artists</h3>
          <select>
            {!!this.props.artists &&
              this.props.artists.map(artist => <option>{artist.name}</option>)}
          </select>
        </section>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));