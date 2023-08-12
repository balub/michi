/**
 * Could not find a project
 * (ProjectService)
 */
export const PROJECT_NOT_FOUND = 'projects/project_could_not_found' as const;

/**
 * User does not exist
 * (UserService)
 */
export const USER_NOT_FOUND = 'user/user_not_found' as const;

/**
 * No cookies were found in the auth request
 * (AuthService)
 */
export const COOKIES_NOT_FOUND = 'auth/cookies_not_found' as const;

/**
 * Access Token is malformed or invalid
 * (AuthService)
 */
export const INVALID_ACCESS_TOKEN = 'auth/invalid_access_token' as const;

/**
 * Refresh Token is malformed or invalid
 * (AuthService)
 */
export const INVALID_REFRESH_TOKEN = 'auth/invalid_refresh_token' as const;
