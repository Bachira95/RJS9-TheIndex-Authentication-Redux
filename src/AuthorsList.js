import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import AddAuthorCard from "./AddAuthorCard";
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

class AuthorsList extends Component {
  state = {
    query: ""
  };

  setQuery = query => this.setState({ query });

  filterAuthors = () => {
    const query = this.state.query.toLowerCase();
    return this.props.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
  };

  render() {
    if (this.props.loading) return <Loading />;

    const authorCards = this.filterAuthors().map(author => (
      <AuthorCard
        key={author.id + author.first_name + author.last_name}
        author={author}
      />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar onChange={this.setQuery} />
        <div className="row">
          {/* this condition to prevenet the logged out user from creating authors */}
          {this.props.user && <AddAuthorCard />}
          {authorCards}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authors, user }) => ({
  authors,
  loading: !authors.length,
  user
});

export default connect(mapStateToProps)(AuthorsList);
