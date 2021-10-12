import * as vscode from 'vscode';

type FileConfig = {
    fileName: string,
    fileUri?: vscode.Uri
};

type LanguageConfig = {
    languageCode: string,
    languageDescription: string
}