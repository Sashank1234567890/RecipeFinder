import React from "react";
import { Link } from "react-router";

function ErrorPage({ error }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-lg w-full text-center">
                <div className="text-6xl mb-6">⚠️</div>

                <h1 className="text-3xl font-bold text-accent mb-4">
                    Something Went Wrong!
                </h1>

                <p className="text-gray-500 mb-8">
                    {error || "An unexpected error occurred while loading the page."}
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-lg bg-accent text-white hover:opacity-90 transition"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}

export default ErrorPage;