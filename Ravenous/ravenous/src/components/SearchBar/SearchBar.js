import React from "react"
import "./SearchBar.css" 

const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Revied": "review_count"
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: "",
            location: "",
            sortBy: "best_match"
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return (<li key={sortByOptionValue} 
                        className={this.getSortByClass(sortByOptionValue)} 
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                           {sortByOption}
                    </li>)
        })
    }

    getSortByClass(sortByOptions) {
        if(sortByOptions === this.state.sortBy) {
            return "active";
        } 
        return "";
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();//prevent the default action of clicking a link from triggering at the end of the method
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                    {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
} 

export default SearchBar