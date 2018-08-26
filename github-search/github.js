class Github {
    constructor() {
        this._clientId = '8eab8bd5efe6320e6ef5';
        this._clientSecret = '9c9bb1471b138166e66fe3fe2a7bdd92cee5d9f7';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this._clientId}&client_secret=${this._clientSecret}`);
        const profile = await profileResponse.json();
        return {
            profile
        };
    }
}