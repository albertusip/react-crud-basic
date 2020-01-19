import React, { Fragment } from "react";
import PropTypes from "prop-types";

const styles = {};
class AppContent extends React.Component {
    render() {
        const { id = "", title = "", body = "" } = this.props.data || {};      
        
        return (
            <Fragment>
                
                <tr>
                    <td>{ id }</td>
                    <td>{ title }</td>
                    <td>{ body }</td>
                </tr>
                    
            </Fragment>
        )
    }
}

AppContent.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }).isRequired
};

export default AppContent;