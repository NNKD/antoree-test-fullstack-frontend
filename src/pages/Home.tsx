import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <p className="text-red-500">Home Page</p>
            <Link to="/login" className="text-blue-400 underline">Go to Login Page</Link>
        </div>
    )
}