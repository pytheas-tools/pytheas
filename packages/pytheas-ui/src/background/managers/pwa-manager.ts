/**
 * Manage PWA service worker
 */
class PWASingleton {
    private static instance: PWASingleton;
    private constructor() {}
    static getInstance() {
        if (!PWASingleton.instance) {
            PWASingleton.instance = new PWASingleton();
        }
        return PWASingleton.instance;
    }

    init() {
        if ('serviceWorker' in navigator) {
            function showRefreshUI(registration) {
                const $refreshToaster = document.querySelector('.refresh-toaster');
                $refreshToaster.style.display = 'flex';
                const $refreshToaster_Refresh_button = $refreshToaster.querySelector('.refresh-toaster__refresh-button');
                if ($refreshToaster_Refresh_button) {
                    $refreshToaster_Refresh_button.addEventListener('click', () => {
                        if (!registration.waiting) {
                            // Just to ensure registration.waiting is available before
                            // calling postMessage()
                            return;
                        }
                        $refreshToaster_Refresh_button.disabled = true;
                        registration.waiting.postMessage('skipWaiting');
                    });
                }
                const $refreshToaster_Close_button = $refreshToaster.querySelector('.refresh-toaster__close-button');
                if ($refreshToaster_Close_button) {
                    $refreshToaster_Close_button.addEventListener('click', () => {
                        $refreshToaster.style.display = 'none';
                    });
                }
            }

            function onNewServiceWorker(registration, callback) {
                if (registration.waiting) {
                    // SW is waiting to activate. Can occur if multiple clients open and
                    // one of the clients is refreshed.
                    return callback();
                }

                function listenInstalledStateChange() {
                    registration.installing.addEventListener('statechange', event => {
                        if (event.target.state === 'installed') {
                            // A new service worker is available, inform the user
                            callback();
                        }
                    });
                }

                if (registration.installing) {
                    return listenInstalledStateChange();
                }

                // We are currently controlled so a new SW may be found...
                // Add a listener in case a new SW is found,
                registration.addEventListener('updatefound', listenInstalledStateChange);
            }

            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').then(registration => {
                    if (!navigator.serviceWorker.controller) {
                        // The window client isn't currently controlled so it's a new service
                        // worker that will activate immediately
                        return;
                    }
                    // When the user asks to refresh the UI, we'll need to reload the window
                    let preventDevToolsReloadLoop: boolean;
                    navigator.serviceWorker.addEventListener('controllerchange', event => {
                        // Ensure refresh is only called once.
                        // This works around a bug in "force update on reload".
                        if (preventDevToolsReloadLoop) {
                            return;
                        }
                        preventDevToolsReloadLoop = true;
                        window.location.reload();
                    });

                    onNewServiceWorker(registration, () => {
                        showRefreshUI(registration);
                    });
                });
            });
        }
    }
}

export const PWAManager = PWASingleton.getInstance();
