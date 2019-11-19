import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// const list = [
//     {
//         title: 'React',
//         url: 'https://reactjs.org/',
//         author: 'Jordan Walke',
//         num_comments: 3,
//         points: 4,
//         objectID: 0,
//     },
//     {
//         title: 'Redux',
//         url: 'https://redux.js.org/',
//         author: 'Dan Abramov, Andrew Clark',
//         num_comments: 2,
//         points: 5,
//         objectID: 1,
//     },
// ];

// function isSearched(searchTerm) {
//     return function (item) {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
// }



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        };
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    setSearchTopStories(result) {
        this.setState({ result });
    }

    componentDidMount() {
        const { searchTerm } = this.state;

        this.fetchSearchTopStories(searchTerm);
    }

    fetchSearchTopStories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedHits = this.state.result.hits.filter(isNotId);
        this.setState({
            result: { ...this.state.result, hits: updatedHits }
        });
    }


    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }

    render() {
        const { searchTerm, result } = this.state;
        if (!result) { return null; }

        return (
            <div className="page">
                <div className="interactions">

                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                { result
                    ? <Table
                        list={result.hits}
                        onDismiss={this.onDismiss}
                    />
                    : null
                }

                <form>
                    <input type="text"
                           value={searchTerm}
                           onChange={this.onSearchChange}
                    />

                </form>

                {this.state.list.map(item => {

                        const onHandleDismiss = () =>
                            this.onDismiss(item.objectID);


                        return (
                            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                                <span>
                <button

                    onClick={() => this.onDismiss(item.objectID)}
                    type="button"
                >
                  Dismiss
                </button>
                            </span>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
}


// class Search extends Component {
//     render() {
//         const { value, onChange, children } = this.props;
//         return (
//             <form>
//                 {children} <input
//                     type="text"
//                     value={value}
//                     onChange={onChange}
//                 />
//             </form>
//         );
//     }
//
// }
const Search = ({
                    value,
                    onChange,
                    onSubmit,
                    children
                }) =>
    <form onSubmit={onSubmit}>
        <input
            type="text"
            value={value}
            onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>;


const Table = ({ list, onDismiss }) =>
    <div className="table">
        {list.map(item =>
                <div key={item.objectID} className="table-row">
        <span style={{width: '40%'}}>
          <a href={item.url}>{item.title}</a>
        </span>
                    <span style={{width: '30%'}}>
          {item.author}
        </span>
                    <span style={{width: '10%'}}>
          {item.num_comments}
        </span>
                    <span style={{width: '10%'}}>
          {item.points}
        </span>
                    <span style={{width: '10%'}}>
          <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
          >
            Dismiss
          </Button>
        </span>
                </div>
        )}
    </div>;


class Button extends Component {
    render() {
        const {
            onClick,
            className = '',
            children,
        } = this.props;

        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        );
    }
}

export default App;
