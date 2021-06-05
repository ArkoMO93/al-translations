import * as vscode from 'vscode';

declare global{
    const tsvscode: any;
}

type FileConfig = {
    fileName: string,
    fileEnabled: boolean
};