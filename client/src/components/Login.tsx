import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email, password
            },
            {withCredentials: true}
        );

            const user = res.data.user;

            if (user.role == 'admin'){
                navigate('/admin');
            } else {
                navigate('/')
            }

            toast.success("Login Success");

        } catch (error) {
            toast.error("Invalid Credentials!")
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input className="border border-black" type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    );
}

export default Login
