import * as vscode from 'vscode';

type Data = {
    fileChoosen?: FileConfig,
    fileList?: FileConfig[],
    languagesList?: LanguageConfig[]
    newFileLanguage?: LanguageConfig,
    sourceFileChoosen?: FileConfig,
    type: DataType,
    value?: string,
}

type DataType = "onInfo" | "onError" | "onFileList" | "onLanguageList" | "onLoadFile" | "onSetup";

type FileConfig = {
    fileName: string,
    fileUri?: vscode.Uri
};

type LanguageConfig = {
    languageCode: string,
    languageDescription: string
}