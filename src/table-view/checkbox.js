import React, { Component } from 'react';

class Checkbox extends Component {
	
	constructor(props) {
        super(props);
        var  checked = this.props.checked;
		this.state = {
            checked: checked
		};
    }

	componentDidUpdate(prevProps, prevState, snapshot){
		if(this.props.checked !== prevProps.checked){
			var checked = this.props.checked;
			this.setState({
				checked: checked
			});
		}else{
			if ( 'onChange' in this.props ){
				this.props.onChange( this.props.value, this.state.checked );
			}
		}
	}

	componentDidMount(){
		if ( 'onLoad' in this.props ){
			this.props.onLoad( this.props.value, this.state.checked );
		}
	}
    
	shouldComponentUpdate( nextProps, nextState ){
		var shallComponentUpdate = ( this.state.checked !== nextState.checked || this.props.checked !== nextProps.checked ) ? true : false;
		return shallComponentUpdate;
	}

	handleChange = (value) => {
		
        var checked = (this.state.checked) ? false : true;
		this.setState({
			checked: checked
		});
		if ( 'onClick' in this.props ){
			this.props.onClick( this.props.value, checked );
		}

	}

	render() {
        return (
            <div className="checkbox check-primary">
    			<input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
    			<label onClick={this.handleChange}>{this.props.label}</label>
    		</div>
        )

	}
	
}

export default Checkbox;