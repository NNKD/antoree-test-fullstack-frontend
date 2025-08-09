import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div>
            <p className="text-green-400">Login Page</p>
            <Link to="/" className="text-blue-400 underline">Go to Home Page</Link>
        </div>
    )
}