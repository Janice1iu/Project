import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"

const AdminLogin = () => {
    return (
        <div>
            <div class="container p-10 my-10 border bg-info">
                <div class="container p-5 my-5 border bg-white">
                    <h1>User login</h1>
                    <form action="https://backendadmin.com" method="POST" id="loginform">
                        <input type="text" name="username" id="username" placeholder="Username" /><br />
                        <input type="password" name="password" id="password" placeholder="password" /><br />
                        <input type="submit" /><i class="bi bi-file-person"></i>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AdminLogin;