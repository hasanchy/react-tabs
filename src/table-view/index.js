import React, { Component } from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import PageLimitButton from './page-limit-button';
import PaginationButtons from './pagination-buttons';
import './table-view.css';

class TableView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thead:this.getThead(),
            tbody:this.getTbody(),
            totalRecords:this.getTotalRecords(),
            filteredRecords:this.getTotalRecords(),
            limit:this.getPageLimit(),
            page:this.getPage(),
            sort:this.getSortState(),
            searchKeyword:this.getSearchKeyword(),
            checkedRows:[]
        }
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ){
        
        if(prevProps!==this.props){
            var stateObject = {};
            if( 'data' in this.props && (prevProps.data !== this.props.data) ){
                stateObject.thead = this.getThead();
                stateObject.tbody = this.getTbody();
            }
            if( 'sort' in this.props && (prevProps.sort !== this.props.sort) ){
                stateObject.sort = this.getSortState();
            }
            if( 'page' in this.props && (prevProps.page !== this.props.page) ){
                stateObject.page = this.getPage();
            }
            if( 'limit' in this.props && (prevProps.limit !== this.props.limit) ){
                stateObject.limit = this.getPageLimit();
            }
            if( 'searchKeyword' in this.props && (prevProps.searchKeyword !== this.props.searchKeyword) ){
                stateObject.searchKeyword = this.getSearchKeyword();
            }
            if( 'totalRecords' in this.props && (prevProps.totalRecords !== this.props.totalRecords) ){
                stateObject.totalRecords = this.getTotalRecords();
            }
            
            this.setState(stateObject);
        }
        
        if( 'onRowSelect' in this.props && this.state.checkedRows !== prevState.checkedRows ){
            this.props.onRowSelect( this.state.checkedRows );
        }
        
    }
    getData = () => {
        return this.props.data;
    }
    
    getPageLimit = () => {
        var limit = ( 'limit' in this.props ) ? this.props.limit : 1;
        return limit;
    }
    
    getPage = () => {
        var page = ( 'page' in this.props ) ? this.props.page : 1;
        return page;
    }
    
    getSortState = () => {
        var sortState = ( 'sort' in this.props ) ? this.props.sort : {};
        return sortState;
    }
    
    getSearchKeyword = () => {
        var searchKeyword = ( 'searchKeyword' in this.props ) ? this.props.searchKeyword : "";
        return searchKeyword;
    }
    
    getThead = () => {
        var thead = ( 'thead' in this.props.data ) ? this.props.data.thead : "";
        return thead;
    }
    
    getTbody = () => {
        var tbody = ( 'tbody' in this.props.data ) ? this.props.data.tbody : "";
        return tbody;
    }
    
    getTotalRecords = () => {
        var totalRecords = ( 'totalRecords' in this.props ) ? this.props.totalRecords : this.props.data.tbody.tr.length;
        return totalRecords;
    }
    
    handlePageLimitChange = ( pageLimit ) => {
        if(this.props.onLimitChange){
            this.props.onLimitChange(pageLimit);
        }else{
            this.setState({
                page: 1,
                limit: pageLimit
            });
        }
    }
    
    handlePageChange = ( page ) => {
        if(this.props.onPageChange){
            this.props.onPageChange(page);
        }else{
            this.setState({
                page: page
            });
        }
    }

    handleSortData = ( key, direction, index ) => {
        var sort = {
            key:key,
            direction:direction
        }
        if(this.props.onSortChange){
            this.props.onSortChange(sort);
        }else{
            var tbody = Object.assign({}, this.state.tbody);
            if(direction==="desc"){
                tbody.tr.sort((a, b) => (a.td[index].text < b.td[index].text) ? 1 : -1);
            }else{
                tbody.tr.sort((a, b) => (a.td[index].text > b.td[index].text) ? 1 : -1);
            }
            
            this.setState({
                tbody: tbody,
                sort: sort,
                page:1
            });
        }
    }
    
    handleTableSearch = ( e ) => {
        var searchKeyword = e.target.value;
        if(this.props.onSearchKeywordChange){
            this.props.onSearchKeywordChange(searchKeyword);
        }else{
            
            // var searchedData = this.searchData( searchKeyword );
            // var totalRecords = searchedData.tr.filter(String).length;
            // console.log( searchedData );
            this.setState({
                searchKeyword: searchKeyword,
                page:1
            });
        }
        
    }
    
    handleTotalRecordsChange = ( totalRecords ) => {
        //console.log( totalRecords );
        if( !this.props.onPageChange){
            //console.log( totalRecords );
            this.setState({
                totalRecords:totalRecords
            })
        }
    }
    
    handleExpandRow = ( index, status ) => {
        var tbody = Object.assign({}, this.state.tbody);
        tbody.tr[index].expand.status = (tbody.tr[index].expand.status) ? false : true;
        this.setState({
            tbody: tbody
        });
    }
    
    handleCheckboxUpdate = ( index, status ) => {
        var thead = Object.assign({}, this.state.thead);
        var tbody = Object.assign({}, this.state.tbody);
        var checkedRows = Object.assign([], this.state.checkedRows);
        
        var checked = (tbody.tr[index].checkbox.checked) ? false : true;
        tbody.tr[index].checkbox.checked = checked;
        
        if( checked ){
            checkedRows.push(tbody.tr[index].checkbox.value)
        }else{
            index = checkedRows.indexOf(tbody.tr[index].checkbox.value);
            if( index !== -1 ){
                checkedRows.splice(index, 1);
            }
        }
        
        if( checkedRows.length === this.state.tbody.tr.length){
            thead.tr[0].checkbox.checked  = true;
        }else {
            thead.tr[0].checkbox.checked  = false;
        }
        
        
        this.setState({
            thead: thead,
            tbody: tbody,
            checkedRows: checkedRows
        });
    }
    
    handleCheckboxAllUpdate = ( index ) => {
        
        //console.log( 'handleCheckboxAllUpdate' );
        var thead = Object.assign({}, this.state.thead);
        var tbody = Object.assign({}, this.state.tbody);
        var checkedRows = Object.assign([], this.state.checkedRows);
        
        var checked = (thead.tr[index].checkbox.checked) ? false : true;
        thead.tr[index].checkbox.checked  = checked;
        
        for( var i in tbody.tr){
            if(tbody.tr[i].checkbox){
                tbody.tr[i].checkbox.checked = checked;
                index = checkedRows.indexOf(tbody.tr[i].checkbox.value);
                if(checked){
                    if(index === -1){
                        checkedRows.push(tbody.tr[i].checkbox.value)
                    }
                }else{
                    if(index !== -1){
                        checkedRows.splice(index, 1);
                    }
                }
            }
        }
        
        this.setState({
            thead: thead,
            tbody: tbody,
            checkedRows: checkedRows
        });
        
    }
    
    renderTable = () => {
        
        var doPagination = ( 'onPageChange' in this.props ) ? false : true;
        
        return <table className='table' style={{borderCollapse:"collapse",backgroundColor:"rgb(255, 255, 255)",width:"100%"}}>
            <TableHeader
                thead={this.state.thead} 
                sort={this.state.sort}
                onSortData={this.handleSortData}
                onCheckboxAllUpdate={this.handleCheckboxAllUpdate}
            />
            <TableBody 
                tbody={this.state.tbody}
                searchedData={this.state.searchedData}
                searchKeyword={this.state.searchKeyword}
                limit={this.state.limit}
                page={this.state.page}
                externalComponents={this.props.externalComponents}
                onTotalRecordsChange={this.handleTotalRecordsChange}
                onExpandRow={this.handleExpandRow}
                onCheckboxUpdate={this.handleCheckboxUpdate}
                doPagination={doPagination}
            />
        </table>
    }
    
    renderPageSizeOption = () => {
        return <PageLimitButton 
            limit={this.state.limit} 
            onPageLimitChange={this.handlePageLimitChange}
        />
    }
    
    renderPaginationButtons = () => {
        return <PaginationButtons
            limit={this.state.limit} 
            page={this.state.page} 
            totalRecords={this.state.totalRecords}
            filteredRecords={this.state.filteredRecords}
            onPageChange={this.handlePageChange}
        />
    }
    
    renderSearchBox = () => {
        
        return <div style={{float:"right",width:"25%"}}>
            <div className="input-group" style={{width:"100%"}}>
                <input type="text" className="form-control search-input" value={this.state.searchKeyword}  name="search" placeholder="Search..." onChange={this.handleTableSearch}/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="fa fa-search m-r-5"></i></button>
                </span>
            </div>
        </div>
        
    }
    
    render() {
        return (
            <div style={{ width: '100%' }}>
                {this.renderSearchBox()}
                {this.renderTable()}
                {this.renderPageSizeOption()}
                {this.renderPaginationButtons()}
            </div>
        )
    }
    
}

export default TableView;