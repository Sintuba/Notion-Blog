import React from "react";
declare module "react-syntax-highlighter"{
    export interface SyntaxHighlighterProps{
        language?:string;
        style?:object;
    }
    export const SyntaxHighlighter:React.ComponentType<SyntaxHighlighterProps>;
}