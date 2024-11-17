import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '..';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadfile(data.image[0]) : null;

            if (file) {
                service.deletefile(post.featuredimage);
            }

            const dbPost = await service.updatepost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadfile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await service.createpost({ ...data, userid: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');

        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="w-2/3 px-4">
                <Input
                    label="Title :"
                    placeholder="Enter Title"
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Enter Slug"
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="w-1/3 px-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getfilepreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4 border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgcolor={post ? 'bg-green-500' : 'bg-blue-500'}
                    className="w-full py-2 rounded-lg text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}
