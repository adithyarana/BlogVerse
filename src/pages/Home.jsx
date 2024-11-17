import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getposts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-50">
                <Container>
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Welcome to BlogVerse!
                        </h1>
                        <p className="text-lg text-gray-600">
                            Login to explore amazing posts and stories! 👇
                        </p>
                        <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        <Link to="/login">Login Now</Link>
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="hero-section bg-blue-500 text-white text-center py-12">
                <h1 className="text-5xl font-bold">Discover Incredible Stories</h1>
                <p className="text-lg mt-4">
                    Dive into a world of creativity, knowledge, and inspiration.
                </p>
            </div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {posts.map((post) => (
                        <div key={post.$id} className="transform hover:scale-105 transition duration-300">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
