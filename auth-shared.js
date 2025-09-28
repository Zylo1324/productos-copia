const SHARED_KEY = '__ZYLO_AUTH_HOST__';

export function registerAuthHost(host){
  if(host && typeof host === 'object'){
    window[SHARED_KEY] = host;
  }
}

export function getAuthHostWindow(){
  if(window[SHARED_KEY]){
    return window;
  }
  if(window.opener && !window.opener.closed && window.opener[SHARED_KEY]){
    return window.opener;
  }
  return null;
}

export function getAuthHost(){
  const hostWindow = getAuthHostWindow();
  return hostWindow ? hostWindow[SHARED_KEY] : null;
}

function ensureAuthHost(){
  const host = getAuthHost();
  if(!host){
    throw new Error('Host de autenticación no disponible.');
  }
  return host;
}

export const autoSignInOrUp = (...args)=>ensureAuthHost().autoSignInOrUp(...args);
export const handleAuthSuccess = (...args)=>ensureAuthHost().handleAuthSuccess(...args);
export const forwardGoogleCredential = (...args)=>ensureAuthHost().forwardGoogleCredential(...args);
export const handleGoogleCredentialResponse = (...args)=>ensureAuthHost().handleGoogleCredentialResponse(...args);
export const initializeGoogleSignIn = (...args)=>ensureAuthHost().initializeGoogleSignIn(...args);
export const requestPasswordReset = (...args)=>ensureAuthHost().requestPasswordReset(...args);

export function getAuthHostConfig(){
  const hostWindow = getAuthHostWindow();
  if(hostWindow && hostWindow.APP_CONFIG){
    return hostWindow.APP_CONFIG;
  }
  return window.APP_CONFIG || {};
}
