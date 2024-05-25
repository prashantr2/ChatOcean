export const validateRegisterForm = (email, username, password, confirmPassword) => {
    if (!email.includes('@')) return { err: 'Invalid email address'};
    if (username.length < 4) return { err: 'Username must be at least 4 letters long'};
    if (password.length < 6) return { err: 'Password must be at least 6 letters long'};
    if (password !== confirmPassword) return { err: "Both passwords don't match!"}
    return { err: null, user: { email, password, username } };
}

export const validateEditForm = (email, username, password, confirmPassword) => {
    if (email && !email.includes('@')) return { err: 'Invalid email address' };
    if (username && username.length < 4) return { err: 'Username must be at leaset 4 letters long' }
    if (password && password.length < 6) return { err: 'Password must be at least 6 letters long'};
    if (password && password !== confirmPassword) return { err: "Both passwords don't match!"}
    return { err: null, user: { email, password, username } };
}