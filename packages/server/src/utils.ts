/**
 * Checks to see if the email is valid or not
 * @param email The email
 * @see https://emailregex.com/ for information on email regex
 * @returns A Boolean depending on the format of the email
 */
export const validateEmail = (email: string) => {
  return new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ).test(email);
};
