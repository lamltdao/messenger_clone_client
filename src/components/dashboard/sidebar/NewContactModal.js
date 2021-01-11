import React, {useState} from 'react'
import SearchField from './Searchfield'
export default function NewContactModal() {
    const [searchWord, setSearchWord] = useState('')
    const [searchResults, setSearchResults] = useState([])
    function searchFriend() {

    }
    return (
        <div>
           <div>
                <SearchField searchFriend = {searchFriend}/>
            </div> 
            <div>
                {
                    searchResults.length > 0 ? 
                    searchResults.map((result, index) => {
                        return (
                            <div>{index}</div>
                        )
                    })
                    :
                    <div>
                        No user found
                    </div>
                }
            </div>
        </div>
    )
}
