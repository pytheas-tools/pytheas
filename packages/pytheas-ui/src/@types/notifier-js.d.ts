declare module 'notifier-js' {
    export function show(title: string, msg: string, type: string, icon: string, timeout: number): string;
    export function hide(notificationId: string): boolean;
}
