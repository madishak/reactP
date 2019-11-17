import React, { Component } from 'react';
import './App.css';


const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

function isSearched(searchTerm) {
    return function (item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            searchTerm: '',
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    onDismiss(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({ list: updatedList });
    }


    render() {
        const { searchTerm, list } = this.state;

        return (
            <div className="page">
                <div className="interactions">

                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >
                    Search
                </Search>
                </div>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />

                <form>
                    <input type="text"
                           value={searchTerm}
                           onChange={this.onSearchChange}
                    />

                </form>

                {this.state.list.filter(isSearched(searchTerm)).map(item => {

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
const Search = ({ value, onChange, children }) => {

    return (
        <form>
            {children} <input
            type="text"
            value={value}
            onChange={onChange}
        />
        </form>
    );
}

class Table extends Component {
    render() {
        const { list, pattern, onDismiss } = this.props;
        return (
            <div className="table">
                {list.filter(isSearched(pattern)).map(item =>
                        <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
                            <span style={{ width: '30%' }}>
          {item.author}
        </span>
                            <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
                            <span style={{ width: '10%' }}>
          {item.points}
        </span>
                            <span style={{ width: '10%' }}>
          <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
          >
            Dismiss
          </Button>
        </span>
                        </div>
                )}
            </div>
        );
    }
}

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
