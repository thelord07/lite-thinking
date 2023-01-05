import React, { useState } from "react";
import liteApi from '../../api/liteApi';

export default function BtnSendEmail() {
const [message, setMessage] = useState("");
const [email, setEmail] = useState('')
const sendMail = async () => {
    try {
        setMessage("Sending test mail");
        console.log('email', email)
        const response = await liteApi.post('/send-email',{email})

        if (response.data.ok) {
            setMessage("Successfully send test mail");
        } 
    } catch (error) {
        console.log(error);
        // handle the error
    }
};
const handleChange = (event: any) => {
setEmail(event.target.value)
}
    return (
        <div >
            <input type="email" placeholder="Email" onChange={handleChange} value={email} />
            <button onClick={sendMail} className="bg-cyan-900 text-white px-5 py-1 rounded mt-5">Send Email</button>
                {message}
        </div>
    );
}