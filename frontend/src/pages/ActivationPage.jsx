import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../server";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ActivationPage() {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/users/activation`, {
                        activation_token,
                    });
                    console.log(res.data.message);
                    setSuccess(true);
                    toast.success("Your account has been created");
                    setTimeout(() => navigate("/login"), 3000); // Navigate after 3 seconds
                } catch (error) {
                    console.log(error.response.data.message);
                    setError(true);
                    toast.error("Activation failed. Please try again.");
                }
            };
            activationEmail();
        }
    }, [activation_token, navigate]);

    return (
        <div className="w-full h-[45.5vh] flex justify-center items-center font-bold text-xl">
            {error ? (
                <p>Your token is expired or invalid.</p>
            ) : success ? (
                <h1>Account activated successfully!</h1>
            ) : (
                <p>Activating your account...</p>
            )}
        </div>
    );
}

export default ActivationPage;