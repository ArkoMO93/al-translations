import * as vscode from 'vscode';
import {SidebarProvider} from './WebViewsProviders/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"al-translations-sidebar",
		sidebarProvider
		)
	);
}

export function deactivate() {}
