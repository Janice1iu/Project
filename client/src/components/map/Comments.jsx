import React from "react";
import "./comment.js";


const Comments = () => {
    return (
        <div class="container m-5">
            <div id="comments">
                <div id="c1001" class="d-flex">
                    <div class="flex-shrink-0">
                        <svg height="100" width="100">
                            <circle cx="50" cy="50" r="40" fill="green" />
                        </svg>
                    </div>
                    <div class="flex-grow-1">
                        <h5>rickieaustin@cuhk.edu.hk</h5>
                        <p>This event is cool</p>
                    </div>
                </div>
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form>
                <div class="mb-3">
                    <label for="new-email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="new-email" placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <label for="new-comment" class="form-label">Comment</label>
                    <textarea class="form-control" id="new-comment" rows="3"></textarea>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="new-color" id="new-color-red" value="red" />
                    <label class="form-check-label" for="new-color-red">Red</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="new-color" id="new-color-blue" value="blue" />
                    <label class="form-check-label" for="new-color-blue">Blue</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="new-color" id="new-color-yellow" value="yellow" />
                    <label class="form-check-label" for="new-color-yellow">Yellow</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="new-color" id="new-color-pink" value="pink" />
                    <label class="form-check-label" for="new-color-pink">Pink</label>
                </div>
                <button type="button" class="btn btn-primary" onclick="processform()">Add comment</button>
                <button type="button" class="btn btn-primary" onclick="loadfile()">Load File</button>
                <button type="button" class="btn btn-primary" onclick="savefile()">Save File</button>
            </form>
        </div>

    )
}

export default Comments;