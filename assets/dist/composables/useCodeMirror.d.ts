export declare function useCodeMirror(): Promise<{
    CodeMirror: any;
    CodeMirrorOptions: {
        tabSize: number;
        mode: string;
        styleActiveLine: boolean;
        theme: string;
        lineNumbers: boolean;
        line: boolean;
        height: string;
        autoCloseBrackets: boolean;
    };
}>;
