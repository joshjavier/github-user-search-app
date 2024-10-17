import axios from "axios";

class GitHubUser {
  static #apiUrl = 'https://api.github.com/users/'
  static async fetch(username) {
    try {
      const response = await axios.get(GitHubUser.#apiUrl + username)
      return new GitHubUser(response.data)
    } catch (error) {
      if (error.response.status === 404) {
        return null
      } else {
        throw error
      }
    }
  }

  constructor(data) {
    this.data = data
    this.exists = Boolean(data)
  }

  get info() {
    return {
      name: this.data.name || this.data.login,
      username: '@' + this.data.login,
      avatar: this.data.avatar_url,
      profile: this.data.html_url,
      dateJoined: this.format(this.data.created_at),
      bio: this.data.bio,
      repos: this.data.public_repos,
      followers: this.data.followers,
      following: this.data.following,
      location: this.data.location,
      blog: this.data.blog,
      company: this.data.company,
      twitter: this.data.twitter_username,
    }
  }

  /**
   * Format a date into something like "26 Jan 2011"
   * @param {Date | string} date - The date to format
   * @param {object} options     - See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
   * @returns {string}
   */
  format(date, { dateStyle = 'medium' } = {}) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    const options = { dateStyle, ...arguments[1] }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  }
}

export default GitHubUser
