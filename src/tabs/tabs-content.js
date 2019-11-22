import React, { Component } from 'react';

class TabsContent extends Component {

	constructor(props) {
        super(props);
        this.state = {}
    }
    
    shouldComponentUpdate( nextProps, nextState ){
		var shouldComponentUpdate = ( JSON.stringify(this.props) !== JSON.stringify(nextProps) ) ? true : false;
		return shouldComponentUpdate;

	}
    
	render(){
        var tabContent = [];
		for( var i in this.props.data ){
			var className = ( this.props.data[i].id == this.props.activeTab ) ? "tab-pane active" : "tab-pane";
			var Component = this.props.data[i].content.component;
			var data = ( 'data' in this.props.data[i].content ) ? this.props.data[i].content.data : "";
			tabContent.push(
				<div className={className} id={"tab"+i} key={Math.random()}>
					<Component data={data} setTabActive={this.props.setTabActive} lockTabs={this.props.lockTabs} unlockTabs={this.props.unlockTabs} disableTabs={this.props.disableTabs} enableTabs={this.props.enableTabs}/>
				</div>
			);
		}
		
		return (
			<div className="tab-content" style={{padding:"0px"}} id="tabs">
				{tabContent}
			</div>
		)

	}
	
}

export default TabsContent;