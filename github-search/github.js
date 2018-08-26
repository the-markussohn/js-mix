class Github {
    constructor() {
        this._clientId = '8eab8bd5efe6320e6ef5';
        this._clientSecret = '9c9bb1471b138166e66fe3fe2a7bdd92cee5d9f7';
        this._repos_count = 5;
        this._repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this._clientId}&client_secret=${this._clientSecret}`);
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this._repos_count}&sort=${this._repos_sort}&client_id=${this._clientId}&client_secret=${this._clientSecret}`);
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        return {
            profile,
            repos
        };
    }
}