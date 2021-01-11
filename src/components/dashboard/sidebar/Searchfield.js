import React from 'react'
import {} from 'react-bootstrap'
export default function Searchfield(props) {
    return (
        <div className='searchfield'>
            <form className='col-12'>
                <input className='form-control' type='text' placeholder='Search' onChange={props.searchFriend}/>
            </form>
        </div>
    )
}
