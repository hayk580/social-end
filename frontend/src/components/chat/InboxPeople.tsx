import React from 'react'
import { SearchBox } from './SearchBox'
import { SideBar } from './SideBar'

export const InboxPeople: React.FC = () => {
    return (
        <>
            {/* <!-- Inbox people inicio --> */}
            <div className="inbox_people">

                <SearchBox />

                <SideBar />


            </div>
            {/* <!-- Inbox people Fin --> */}
        </>
    )
}
