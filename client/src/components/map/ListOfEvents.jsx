import React from "react";
import Event from "./Event.jsx"
const ListOfEvents = () => {




    return (
        <div>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Event</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Description</th>
                        <th scope="col">Presenter</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <Event />
                    <Event />
                    <Event />
                </tbody>
            </table>
        </div>
    )
}

export default ListOfEvents;




