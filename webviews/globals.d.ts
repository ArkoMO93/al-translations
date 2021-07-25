import * as vscode from 'vscode';

declare global {
    const tsvscode: any;
}

type FileConfig = {
    fileName: string,
    fileUri?: vscode.Uri
};

type LanguageConfig = {
    languageCode: string,
    languageDescription: string
}