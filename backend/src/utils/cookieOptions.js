const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000
};


const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

export { accessTokenCookieOptions, refreshTokenCookieOptions };