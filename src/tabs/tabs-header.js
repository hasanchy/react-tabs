import React, { Component } from 'react';

class TabsHeader extends Component {

	constructor(props) {
        super(props);
        this.state = {}
    }
    
    shouldComponentUpdate( nextProps, nextState ){
		var shouldComponentUpdate = ( JSON.stringify(this.props) !== JSON.stringify(nextProps) ) ? true : false;
		return shouldComponentUpdate;

	}
    
	render(){
		var tabHeader = [];
		for( var i in this.props.data ){
			var className = ( this.props.data[i].id == this.props.activeTab ) ? "active" : "";
			
			var pointerEvents, fontColor;
			
			if( this.props.disabledTabs.indexOf( this.props.data[i].id ) == -1 && this.props.lockedTabs.indexOf( this.props.data[i].id ) == -1 ){
                pointerEvents = "";
				fontColor = "#2C2C2C"
			}else{
                pointerEvents = "none";
				fontColor = "#9f9f9f"
            }
			
			tabHeader.push(
				<li className={className} key={Math.random()} style={{pointerEvents:pointerEvents}}>
					<a data-toggle="tab" onClick={this.props.onTabClick.bind(this,this.props.data[i].id)} href={"#tab"+i} aria-expanded="false" style={{pointerEvents:pointerEvents}}><span style={{ color: fontColor }}>{this.props.data[i].label}</span></a>
				</li>
			);
		}

		return (
			<ul className="nav nav-tabs nav-tabs-simple" >
				{tabHeader}
			</ul>
		);
	}
	
}

export default TabsHeader;