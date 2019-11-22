import React, { Component } from 'react';
import TabsHeader from './tabs-header';
import TabsContent from './tabs-content';

class Tabs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
			data: this.props.data,
			activeTab: "",
			lockedTabs: [],
			disabledTabs: []
		}
    }

	componentWillMount(){
		
		var activeTab = ( 'activeTab' in this.props ) ? this.props.activeTab : this.props.data[0].id;
		var disabledTabs = [];
		
		if( 'disableInactiveTabs' in this.props && this.props.disableInactiveTabs == true ){
			for( var i in this.props.data){
				if( this.props.data[i].id != activeTab ){
					disabledTabs.push( this.props.data[i].id );
				}
			}
		}
		this.setState({
			activeTab: activeTab,
			disabledTabs: disabledTabs
		})
		
	}
	
	setTabActive( tabId ){
		
		var disabledTabs = this.state.disabledTabs;
		var index = disabledTabs.indexOf(tabId);
		if (index !== -1) disabledTabs.splice(index, 1);
		this.setState({
			activeTab:tabId,
			disabledTabs:disabledTabs
		});
	}
	
	lockTabs( tabIds ){
		
		var lockedTabs = JSON.parse(JSON.stringify( this.state.lockedTabs ) );
		
		for( var i in tabIds ){
			var index = lockedTabs.indexOf(tabIds[i]);
			if (index == -1){
				lockedTabs.push( tabIds[i] );
			}
		}

		this.setState({
			lockedTabs: lockedTabs
		});
		
	}
	
	unlockTabs( tabIds ){
		var lockedTabs = JSON.parse(JSON.stringify( this.state.lockedTabs ) );
		
		for( var i in tabIds ){
			var index = lockedTabs.indexOf(tabIds[i]);
			if (index != -1){
				delete lockedTabs[index];
			}
		}
        this.setState({
			lockedTabs: lockedTabs
		});
	}
    
    disableTabs( tabIds ){
		
		var disabledTabs = JSON.parse(JSON.stringify( this.state.disabledTabs ) );
		
		for( var i in tabIds ){
			var index = disabledTabs.indexOf(tabIds[i]);
			if (index == -1){
				disabledTabs.push( tabIds[i] );
			}
		}

		this.setState({
			disabledTabs: disabledTabs
		});
		
	}
	
	enableTabs( tabIds ){
		var disabledTabs = JSON.parse(JSON.stringify( this.state.disabledTabs ) );
		
		for( var i in tabIds ){
			var index = disabledTabs.indexOf(tabIds[i]);
			if (index != -1){
				delete disabledTabs[index];
			}
		}
        this.setState({
			disabledTabs: disabledTabs
		});
	}
	
    renderTabsHeader(){
        return <TabsHeader data={this.state.data} activeTab={this.state.activeTab} disabledTabs={this.state.disabledTabs} lockedTabs={this.state.lockedTabs} onTabClick={this.setTabActive}/>
	}
    
	renderTabsContent(){
		return <TabsContent data={this.state.data} activeTab={this.state.activeTab} setTabActive={this.setTabActive} lockTabs={this.lockTabs} unlockTabs={this.unlockTabs} disableTabs={this.disableTabs} enableTabs={this.enableTabs}/>
	}

	render(){

		return (
			<div className="panel panel-transparent">
				{this.renderTabsHeader()}
				{this.renderTabsContent()}
			</div>
		)

	}
	
}

export default Tabs;