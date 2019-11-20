import React, { Component } from 'react';
import Checkbox from './checkbox';

class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    shouldComponentUpdate(nextProps, nextState){
        var shouldComponentUpdate = ( this.props.thead !== nextProps.thead || JSON.stringify(this.props.sort) !== JSON.stringify(nextProps.sort) ) ? true : false;
        return shouldComponentUpdate;
    }
    
    render() {
        //console.log( 'rendering header' );
        var that = this;
        var tr = this.props.thead.tr;
        var tableRows = [];
        
        for(var i in tr){
            var th = tr[i].th;
            var tableHeaders = [];
            for(var j in th){
                var colspan = (th[j].colspan)?th[j].colspan:"";
                if(th[j].sort){
                    var directionClass = "";
                    var thClass = "";
                    var direction = "asc";
                    var key = (th[j].sort.key) ? th[j].sort.key : "";
                    
                    
                    
                    if(this.props.sort && (this.props.sort.key === th[j].sort.key) ){
                        directionClass = (this.props.sort.direction === "asc") ? "-up" : "-down";
                        thClass = "active";
                        if(this.props.sort.direction === "asc"){
                            direction = "desc";
                        }
                    }
                    tableHeaders.push( <th className={thClass} colSpan={colspan} key={Math.random()} style={{cursor:"pointer",padding:"10px 0 10px 5px"}} onClick={that.props.onSortData.bind(this,key,direction,j)}>{th[j].text} <i className={"fa fa-sort" + directionClass}/></th> );
                }else if(th[j].checkable){
                    tableHeaders.push( <th key={Math.random()}><Checkbox checked={tr[i].checkbox.checked} onClick={this.props.onCheckboxAllUpdate.bind(this,i)}/></th> );
                }else{
                    tableHeaders.push( <th key={Math.random()} colSpan={colspan} style={{cursor:"pointer",padding:"10px 0 10px 5px"}}>{th[j].text}</th> );
                }
                
            }
            
            tableRows.push( <tr key={Math.random()}>{tableHeaders}</tr> );
            
        }
        
        
        return (    
            <thead>
                {tableRows}
            </thead>
        );
	}
	
}

export default TableHeader;