// index.js

/**
 * Set a cookie
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {number} [days] - Number of days until the cookie expires
 * @param {string} [domain] - The domain for the cookie (use undefined for localhost)
 * @param {boolean} [sameSiteStrict] - Use strict SameSite policy (default is None)
 */
function setCookie(name, value, days, domain, sameSiteStrict = false) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    let domainAttribute = "";
    if (domain && window.location.hostname !== "localhost") {
        domainAttribute = "; domain=" + domain;
    }
    let sameSite = "; SameSite=None";
    if (sameSiteStrict) {
        sameSite = "; SameSite=Strict";
    }
    document.cookie = name + "=" + (value || "") + expires + domainAttribute + "; path=/; Secure; HttpOnly" + sameSite;
}

/**
 * Get a cookie by name
 * @param {string} name - The name of the cookie
 * @returns {string|null} - The value of the cookie, or null if not found
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Erase a cookie by name
 * @param {string} name - The name of the cookie
 * @param {string} [domain] - The domain for the cookie (use undefined for localhost)
 */
function eraseCookie(name, domain) {
    let domainAttribute = "";
    if (domain && window.location.hostname !== "localhost") {
        domainAttribute = "; domain=" + domain;
    }
    document.cookie = name + '=; Max-Age=-99999999;' + domainAttribute + "; path=/; Secure; HttpOnly; SameSite=None";
}

module.exports = {
    setCookie,
    getCookie,
    eraseCookie
};
