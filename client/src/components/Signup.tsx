import axios from "axios"
import React, { useState } from "react"
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignup = async(e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", {
                email, password
            },
            
        );

            console.log("Signup Successful:", res.data);
            toast.success("Account has been created!")
        } catch (error) {
            toast.error("Signup failed");
        }

    }

    return (
        <form onSubmit={handleSignup}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button>Sign Up</button>
        </form>
    );
}

export default Signup
