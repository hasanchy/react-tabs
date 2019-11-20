import React, { Component } from 'react';
import TableView from '../table-view';
import UserDetails from './user-details';
import ExpandData from './expand-data';
//import CheckboxData from './checkbox-data';

class TableWidget extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword:"",
            selectionInfo:"",
            data: ExpandData,
            totalRecords: 5,
            sort:{
                key:"name",
                direction:"desc"
            },
            page:1,
            limit:10
        }
    }
    
     handleRowSelect = ( rowValues ) => {
       console.log( rowValues );
       var total = rowValues.length;
       var users = ( total === 1 ) ? "user" : "users";
       var selectionInfo = ( rowValues.length > 0 ) ? rowValues.length + " " + users + " selected" : "";
       this.setState({
          selectionInfo: selectionInfo
       });
   }
   
    handleSortChange( sort ){
        this.setState({
            sort:sort
        });
    }
    
    handlePageChange( page ){
        // this.setState({
        //     page:page,
        //     data: CheckboxData,
        // });
    }
    
    handleLimitChange( limit ){
        
    }
    
    render() {
        var externalComponents = {
            "UserDetails":UserDetails
        };
        
        return (
            <div style={{ width: '100%' }}>
                <span style={{float:"left"}}>{this.state.selectionInfo}</span>
                <TableView
                          data={this.state.data}
                          totalRecords ={this.state.totalRecords}
                          page={this.state.page}
                          sort={this.state.sort}
                          limit={this.state.limit}
                          searchKeyword={this.state.searchKeyword}
                          externalComponents={externalComponents}
                          onRowSelect={this.handleRowSelect}
                          onPageChange={this.handlePageChange.bind(this)}
                          //onSortChange={this.handleSortChange.bind(this)}
                          // onLimitChange={this.handleLimitChange.bind(this)}
                      />
            </div>
        )
    }
    
}

export default TableWidget;