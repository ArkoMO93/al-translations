import * as vscode from 'vscode';

type Data = {
    fileChoosen?: FileConfig,
    fileList?: FileConfig[],
    languagesList?: LanguageConfig[]
    newFileLanguage?: string,
    type: "onInfo" | "onError" | "onFileList" | "onLanguageList" | "onLoadFile",
    value?: string,
}

type FileConfig = {
    fileName: string,
    fileUri?: vscode.Uri
};

type LanguageConfig = {
    languageCode: string,
    languageDescription: string
}