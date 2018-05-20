import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Image from 'material-ui-image'

export default class Avatar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = this.props.style || {};
        style.width = this.props.size;
        style.height = this.props.size;
        return (
            <div style={style}>
                <Image style={{display: 'flex', alignItems: 'center'}}
                       src={this.props.url ? this.props.url : ""}/>
            </div>
        )
    }
}

Avatar.propTypes = {
    size: PropTypes.number,
    url: PropTypes.string,
    style: PropTypes.object
};