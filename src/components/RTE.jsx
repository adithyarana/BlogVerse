import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// This code is for creating a rich text editor (RTE) component using React. 
// It integrates the TinyMCE editor and the react-hook-form library to manage form state and validation.

export default function RTE({ name, control, label, defaultvalue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    
                        initialValue={defaultvalue}
                         apiKey='ogoneri8e2y9fhu4v4sebk004j4ekaynvuw1js8tb99w2ml1'
                        init={{
                            initialValue: defaultvalue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            // Add your API key here
                           
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    );
}

{/* This component can be used in forms where rich text input is required, such as a blog post editor, 
comment section, or content management system. The integration with react-hook-form makes it easy to manage and validate form data,
 ensuring that the rich text input is seamlessly integrated into your form's state management. */}

