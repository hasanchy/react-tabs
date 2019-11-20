import React, { Component } from 'react';

class UserDetails extends Component {
    
    constructor(props) {
      super(props);
      this.state = {};
    }
    
    componentDidMount(){
        
        if( !this.props.data.api_response ){
            console.log( 'Fetching expand data' );
            this.props.data['api_response'] = {
                "data":{
                    "first_name":"Hasan",
                    "last_name":"Chowdhury"
                }
            }
        }
        
    }
    
    render(){
        console.log( this.props.data );
        return(
            <div style={{padding:"20px"}}>
                {this.props.data.description}
                <div>
                    id = {this.props.data.id}
                </div>
            </div>
        );
    }
}

export default UserDetails;