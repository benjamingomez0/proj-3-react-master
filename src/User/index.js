import React, { Component } from 'react'

class UserShow extends Component {
    state = {
        user: {}
    }
    async componentDidMount(){
        // console.log(this.props.match.params.id)
        // const userId = this.props.match.params.id
        const userId = 5
        const reqUser = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
        const parsedUser = await reqUser.json()
        console.log(parsedUser)
        this.setState({
            user: parsedUser.data
        })
    }
    render(){
        return(
            <div>
                {this.state.user.id}
            </div>
        )
    }
}

export default UserShow