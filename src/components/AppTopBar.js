import React, { Fragment } from "react";
import PropTypes from "prop-types";

const styles = {};
class AppTopBar extends React.Component {
    state = {
        
    };

    render() {
        const { classes } = this.props;
        // console.log(this);
        
        return (
            <Fragment>
                <div className="col-sm-12">
                    <h3>React CRUD</h3>
                </div>
            </Fragment>
        )
    }
}

// AppTopBar.propTypes = {
//     classes: PropTypes.object.isRequired
// }; 

export default AppTopBar;