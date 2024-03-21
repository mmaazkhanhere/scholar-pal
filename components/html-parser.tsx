"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import parser from "html-react-parser";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-markup";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import '@/app/prism.css'

interface Props {
    data: string;
}

const HtmlParser = ({ data }: Props) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div
            className=" max-w-full prose 
        prose-headings:text-[#343a40]  prose-p:text-[#343a40]  
        prose-ul:text-[#343a40] prose-ol:text-[#343a40]
        w-full min-w-full"
        >
            {parser(data)}
        </div>
    );
};

export default HtmlParser;