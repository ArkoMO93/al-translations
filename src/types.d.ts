import * as vscode from 'vscode';
import { SimpleTransUnit } from '../webviews/sveltetable-types';
import { Translation } from './xliff-types';

type Data = {
    fileChoosen?: FileConfig,
    fileList?: FileConfig[],
    languagesList?: LanguageConfig[]
    newFileLanguage?: LanguageConfig,
    simpleTransUnit?: SimpleTransUnit[],
    sourceFileChoosen?: FileConfig,
    sourceFileTranslation?: Translation,
    type: DataType,
    value?: string,
}

type DataType = "onInfo" | "onError" | "onFileList" | "onLanguageList" | "onLoadFile" | "onSetup";

type FileConfig = {
    fileName: string,
    filePath?: string
};

type LanguageConfig = {
    languageCode: string,
    languageDescription: string
}