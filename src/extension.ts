import * as vscode from 'vscode';
import {HelloWorldPanel} from './HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "al-translations" is now active!');

	let disposable = vscode.commands.registerCommand('al-translations.helloWorld', () => {
		HelloWorldPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
