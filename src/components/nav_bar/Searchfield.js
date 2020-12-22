import React from 'react'

export default function Searchfield() {
    function searchFriend() {

    }
    return (
        <div className='searchfield'>
            <form className='col-12'>
                <input className='form-control' type='text' placeholder='Search' onChange={searchFriend}/>
            </form>
        </div>
    )
}
