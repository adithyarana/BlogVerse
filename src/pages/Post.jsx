import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import { Button, Container } from '../components';
import parse from "html-react-parser";
import { useSelector } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.auth.userdata);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // Check if the current user is the author
                    setIsAuthor(post.userid === userdata?.$id);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate, userdata]);

    const deletePost = () => {
        if (post) {
            service.deletepost(post.$id).then((status) => {
                if (status) {
                    service.deletefile(post.featuredimage);
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Main Post Container */}
                <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative">
                        <img
                            src={service.getfilepreview(post.featuredimage)}
                            alt={post.title}
                            className="object-cover w-full h-72 md:h-96"
                        />
                        
                        {/* Author Controls */}
                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgcolor="bg-green-500" className="mr-3">
                                        Edit😒
                                    </Button>
                                </Link>
                                <Button bgcolor="bg-red-500" onClick={deletePost}>
                                    Delete😡
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Post Content Section */}
                    <div className="px-6 py-4">
                        <h1 className="text-3xl font-bold text-center text-gray-900">{post.title}</h1>
                        <div className="mt-4 text-gray-700">
                            {/* Render post content using parse */}
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
