import * as vscode from 'vscode';
import {HelloWorldPanel} from './HelloWorldPanel';
import {SidebarProvider} from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"al-translations-sidebar",
		sidebarProvider
		)
	);

	let disposable = vscode.commands.registerCommand('al-translations.helloWorld', () => {
		HelloWorldPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
