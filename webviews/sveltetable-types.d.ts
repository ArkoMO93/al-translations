import * as vscode from 'vscode';

type SimpleTransUnit = {
    trans_id: string,
    original_source: string,
    source: string,
    original_target: string,
    target: string,
    notes?: SimpleNote[],
    xliffNote?: string 
}

type SimpleNote = {
    from: string,
    value: string
}