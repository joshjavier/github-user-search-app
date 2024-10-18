/** @typedef {'light'|'dark'} Theme */

class ThemeToggle {
  /** @type {Theme} value - The state that holds the current theme */
  value
  /** @type {HTMLButtonElement} toggle - The DOM element that allows users to change the current theme */
  toggle
  /** @type {HTMLSpanElement} span - Visible toggle label (light or dark) */
  label
  /** @type {SVGUseElement} icon - Icon indicator (moon for light and sun for dark) */
  icon

  // Note: The toggle shows the TARGET theme, not the current theme! E.g., when
  // the current theme is light, then the label is 'dark' and the icon href is
  // '#icon-moon'. This might be confusing, but it is what's in the design.

  constructor() {
    // Save the theme preference into state
    this.getThemePreference()
    // Set the `data-theme` attribute early to prevent page flashes
    this.reflectThemeChange()
    // Attach event handlers once the DOM is ready
    document.addEventListener('DOMContentLoaded', this.events)
  }

  /**
   * Gets the theme preference from the local storage (if set). Otherwise,
   * returns 'light' or 'dark' depending on the `prefers-color-scheme` value
   */
  getThemePreference = (key = 'theme-preference') => {
    if (localStorage.getItem(key)) {
      this.value = localStorage.getItem(key)
    } else {
      this.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
  }

  /**
   * Updates the DOM to reflect the theme change
   */
  reflectThemeChange = () => {
    document.documentElement.setAttribute('data-theme', this.value)

    if (document.readyState === 'loading') return

    if (!this.toggle) {
      this.toggle = document.querySelector('#theme-toggle')
      this.label = this.toggle?.querySelector('#theme-value')
      this.icon = this.toggle?.querySelector('#theme-icon').firstChild
    }

    if (this.toggle && this.label.textContent === this.value) {
      this.label.textContent = this.value === 'light' ? 'dark' : 'light'
      this.icon.href = '#icon-' + (this.value === 'light' ? 'moon' : 'sun')
    }
  }

  /**
   * Saves the theme preference in local storage
   * and updates the DOM to reflect the changes
   */
  setThemePreference = (key = 'theme-preference') => {
    localStorage.setItem(key, this.value)
    this.reflectThemeChange()
  }

  events = () => {
    // Call once DOM is ready to sync toggle button with the theme state
    this.reflectThemeChange()

    // Bind event handler to update the theme on toggle press
    this.toggle.addEventListener('click', this)

    // Bind event handler to update the theme when `prefers-color-scheme` changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        this.value = isDark ? 'dark' : 'light'
        this.setThemePreference()
      })
  }

  handleEvent = (e) => {
    console.log('event')
    if (e.type === 'click') {
      this.value = this.value === 'light' ? 'dark' : 'light'
      this.setThemePreference()
    }
  }
}

const themeToggle = new ThemeToggle()
