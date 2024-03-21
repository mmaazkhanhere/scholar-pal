"use client"

import React from 'react'

import { Editor } from "@tinymce/tinymce-react";

type Props = {
    content?: string
    setContent: (content: string) => void;
}

function TinymceTextEditor({ content, setContent }: Props) {

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    return (
        <Editor
            value={content}
            onEditorChange={handleEditorChange}
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            init={{
                codesample_languages: [
                    { text: "HTML/XML", value: "markup" },
                    { text: "JavaScript", value: "javascript" },
                    { text: "CSS", value: "css" },
                    { text: "PHP", value: "php" },
                    { text: "Ruby", value: "ruby" },
                    { text: "Python", value: "python" },
                    { text: "Java", value: "java" },
                    { text: "C", value: "c" },
                    { text: "C#", value: "csharp" },
                    { text: "C++", value: "cpp" },
                    { text: "Dart", value: "dart" },
                    { text: "Go", value: "go" },
                    { text: "Kotlin", value: "kotlin" },
                    { text: "Rust", value: "rust" },
                    { text: "SQL", value: "sql" },
                    { text: "Bash", value: "bash" },
                    { text: "Sass", value: "sass" },
                    { text: "Solidity", value: "solidity" },
                    { text: "JSON", value: "json" },
                    { text: "JSX", value: "jsx" },
                    { text: "TypeScript", value: "typescript" },
                ],
                height: 350,
                menubar: false,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "codesample",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "wordcount",
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                skin: 'snow'
            }}
        />
    )
}

const TextEditor = React.forwardRef(TinymceTextEditor);
export default TextEditor