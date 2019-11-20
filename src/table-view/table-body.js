import React, { Component } from 'react';
import Checkbox from './checkbox';

class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRecords:0
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        var shouldComponentUpdate = ( this.props.tbody !== nextProps.tbody || this.props.searchKeyword !== nextProps.searchKeyword  || this.props.limit !== nextProps.limit  || this.props.page !== nextProps.page ) ? true : false;
        return shouldComponentUpdate;
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ){
        this.props.onTotalRecordsChange( this.state.totalRecords );
    }
    
    searchData = ( searchKeyword ) => {
        
        var tr = [];
        
        for(var i in this.state.tbody.tr){
            var isMatch = false;
            for(var j in this.state.tbody.tr[i].td){
                if(this.state.tbody.tr[i].td[j].text.toString().toLowerCase().indexOf(searchKeyword.toLowerCase())!==-1) {
                    isMatch = true;
                    break;
                }
            }
            if( isMatch ){
                tr[i] = this.state.tbody.tr[i]
            }
        }
        
        return {tr:tr};
    }
    
    getSearchedData = () => {
        var tr = [];
        var index = [];
        
        for(var i in this.props.tbody.tr){
            var isMatch = false;
            for(var j in this.props.tbody.tr[i].td){
                if(this.props.tbody.tr[i].td[j].text.toString().toLowerCase().indexOf(this.props.searchKeyword.toLowerCase())!==-1) {
                    isMatch = true;
                    break;
                }
            }
            if( isMatch ){
                tr.push(this.props.tbody.tr[i]);
                index.push(i);
            }
        }
        
        return {
            tr:tr,
            index:index
        };
    }
    
    render() {
        
        var tbody = (this.props.searchKeyword !== "") ? this.getSearchedData() : this.props.tbody;
        this.state.totalRecords = tbody.tr.length;
        
        var start;
        if(this.props.doPagination){
            start = this.props.limit * (this.props.page - 1);
        }else {
            start = 0;
        }
        
        var end = parseInt(start) + parseInt(this.props.limit) - 1;
        if( end > (parseInt(this.state.totalRecords)-1) ){
            end = parseInt(this.state.totalRecords)-1;
        }
        
        var tableRows = [];
        var that = this;
        var tr = tbody.tr;
        var Component;
        
        for( var i = start; i<=end; i++ ){
            var td = tr[i].td;
            var tableColumns = [];
            var index = (tbody.index) ? tbody.index[i] : i;
            for(var j in td){
                var style = (td[j].style) ? td[j].style : {};
                var expandIcon = "";
                if(td[j].render){
                    ;
                    tableColumns.push( <td key={Math.random()} style={style}>{td[j].render()}</td>);
                }else if(td[j].component){
                    Component = that.props.externalComponents[ td[j].component.name ];
                    tableColumns.push( <td key={Math.random()} style={style}><Component data={td[j].component.data}/></td>);
                }else{
                    if(td[j].expandable){
                        var expandStyle = {cursor:"pointer"}
                        var chevronIcon = (tr[i].expand.status) ? "down" : "right";
                        
                        tableColumns.push( <td key={Math.random()} style={expandStyle} onClick={this.props.onExpandRow.bind(this,index)}>{td[j].text}<i className={"fas fa-fw fa-chevron-"+chevronIcon} style={{marginTop:"5px"}}></i></td> );
                    
                    }else if(td[j].checkable){
                        tableColumns.push( <td key={Math.random()} style={style}><Checkbox checked={tr[i].checkbox.checked} onChange={this.props.onCheckboxUpdate.bind(this,index)}/></td> );
                    }else{
                        tableColumns.push( <td key={Math.random()} style={style}>{td[j].text}{expandIcon}</td> );
                    }
                    
                }
            }
            tableRows.push( <tr key={Math.random()}>{tableColumns}</tr> );
            if(tr[i].expand && tr[i].expand.status){
                var colspan = tr[i].td.length;
                Component = that.props.externalComponents[ tr[i].expand.component.name ];
                
                var expandRow = <tr key={Math.random()}>
                    <td colSpan={colspan} style={{backgroundColor:"#efefef"}}>
                        <Component data={tr[i].expand.component.data}/>
                    </td>
                </tr>
                tableRows.push( expandRow );
            }
        }
        
        
        return (
            <tbody>
                {tableRows}
            </tbody>
        )
	}
	
}

export default TableBody;