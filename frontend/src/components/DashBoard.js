import React, { Fragment } from "react";

import Items from "../components/Items";

class DashBoard extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            items: [],
            newItemName: '',
            isLoading: true
        };
    }

    async componentDidMount() {
        try {
        } catch (e) {
            alert(`Failed to fetch items: ${e.message}`)
        }
    }

    render() {
        return (
            <div className="hero my-5">
                {this.props.isAuthenticated && (
                <Fragment>
                    <p> My DashBoard </p>
                    <hr />
                    <Items />
                </Fragment>)}
            </div>
        );
    }
  };

  export default DashBoard;
