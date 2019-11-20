import React, { Component } from 'react';

class PageLimitButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    shouldComponentUpdate(nextProps, nextState){
        var shouldComponentUpdate = ( this.props.limit !== nextProps.limit ) ? true : false;
        return shouldComponentUpdate;
    }
    
    handleOnChange(event){
        var value = event.target.value;
        this.props.onPageLimitChange(value);
    }
    
    render() {
        return (
            <div className="form-group" style={{float:"left", marginTop:"25px"}}>
                <label>Page size</label>
                <select style={{marginLeft:"5px"}} value={this.props.limit} onChange={this.handleOnChange.bind(this)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                </select>
            </div>
        )
	}
	
}

export default PageLimitButton;