type ThemeProps = Record<
  'light' | 'dark',
  {
    background: string;
    text: string;
    accent: string;
  }
>;

class ThemeSwitcher extends HTMLElement {
  private systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
  private options = ["system", "light", "dark"];
  private _storageKey = "theme";

  private _themeConfig: ThemeProps = {
    light: {
      background: "#ffffff",
      text: "#2d3748",
      accent: "#3182ce",
    },
    dark: {
      background: "#1a202c",
      text: "#e2e8f0",
      accent: "#63b3ed",
    },
  };

  private _onThemeChange: ((theme: string) => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        :host {
          --size: 42px;
          --padding: 4px;
          --transition: 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          --active-bg: rgba(255, 255, 255, 0.9);
          --icon-color: #2d3748;
          display: inline-flex;
          background: var(--bg, rgba(0, 0, 0, 0.05));
          border-radius: calc(var(--size) / 2);
          padding: var(--padding);
          position: relative;
        }

        .wrapper {
          display: flex;
          gap: var(--padding);
          position: relative;
        }

        input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        label {
          cursor: pointer;
          width: var(--size);
          height: var(--size);
          display: grid;
          place-items: center;
          border-radius: 50%;
          transition: all var(--transition);
          position: relative;
          z-index: 2;
          font-size: 1.25em;
          line-height: 1;
        }

        .active-bg {
          position: absolute;
          background: var(--active-bg);
          border-radius: 50%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          width: var(--size);
          height: var(--size);
          left: var(--padding);
          transition: 
            transform var(--transition),
            background-color 0.2s ease;
          z-index: 1;
        }

        :host([data-theme="dark"]) {
          --bg: rgba(255, 255, 255, 0.05);
          --icon-color: #e2e8f0;
          --active-bg: rgba(255, 255, 255, 0.1);
        }

        :host([data-theme="light"]) {
          --bg: rgba(0, 0, 0, 0.05);
          --icon-color: #2d3748;
          --active-bg: rgba(255, 255, 255, 0.9);
        }
      </style>
      <div class="wrapper">
        ${this.options
          .map(
            (opt) => `
          <input type="radio" name="theme" id="${opt}" value="${opt}">
          <label for="${opt}" tabindex="0">
            <span role="img" aria-label="${opt} theme">
              ${this.getEmoji(opt)}
              <span class="sr-only">${opt}</span>
            </span>
          </label>
        `
          )
          .join("")}
        <div class="active-bg"></div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["data-theme", "storage-key"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "storage-key" && newValue !== oldValue) {
      this._storageKey = newValue;
      this.initTheme();
    }
    
    if (name === "data-theme" && newValue !== oldValue && oldValue !== null) {
      this.updateActiveState(newValue);
      this.setTheme(newValue, false); // Don't update storage when externally set
    }
  }

  get storageKey(): string {
    return this._storageKey;
  }

  set storageKey(value: string) {
    this._storageKey = value;
    this.initTheme();
  }

  get themeConfig(): ThemeProps {
    return this._themeConfig;
  }

  set themeConfig(value: ThemeProps) {
    this._themeConfig = value;
    this.updateThemeFromConfig();
  }

  get onThemeChange(): ((theme: string) => void) | null {
    return this._onThemeChange;
  }

  set onThemeChange(callback: ((theme: string) => void) | null) {
    this._onThemeChange = callback;
  }

  private updateThemeFromConfig(): void {
    const currentTheme = this.getAttribute("data-theme") || "system";
    const effectiveTheme =
      currentTheme === "system"
        ? this.systemPreference.matches
          ? "dark"
          : "light"
        : currentTheme;

    if (this._themeConfig && this._themeConfig[effectiveTheme as keyof ThemeProps]) {
      const config = this._themeConfig[effectiveTheme as keyof ThemeProps];
      document.documentElement.style.setProperty(
        "--theme-background",
        config.background
      );
      document.documentElement.style.setProperty("--theme-text", config.text);
      document.documentElement.style.setProperty(
        "--theme-accent",
        config.accent
      );
    }
  }

  connectedCallback(): void {
    this.initTheme();
    this.addEventListeners();
    this.systemPreference.addEventListener("change", this.handleSystemChange);
  }

  disconnectedCallback(): void {
    this.systemPreference.removeEventListener(
      "change",
      this.handleSystemChange
    );
  }

  private getEmoji(theme: string): string {
    const emojis = {
      system: "💻",
      light: "☀️",
      dark: "🌙",
    };
    return emojis[theme as keyof typeof emojis];
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(
      this._storageKey
    ) as (typeof this.options)[number];
    const initialTheme = savedTheme || "system";
    this.setTheme(initialTheme, false);
    this.updateActiveState(initialTheme);
  }

  private updateActiveState(theme: string): void {
    const index = this.options.indexOf(theme);
    if (index === -1) return;
    
    const activeBg = this.shadowRoot!.querySelector(
      ".active-bg"
    ) as HTMLElement;
    
    const input = this.shadowRoot!.querySelector(
      `input[value="${theme}"]`
    ) as HTMLInputElement;
    
    if (input) {
      input.checked = true;
    }
    
    activeBg.style.transform = `translateX(${
      index * (100 + Number.parseInt(getComputedStyle(this).padding))
    }%)`;

    this.setAttribute("data-theme", theme);
  }

  private setTheme(theme: string, updateStorage: boolean = true): void {
    const isDark =
      theme === "system" ? this.systemPreference.matches : theme === "dark";

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    if (updateStorage) {
      if (theme !== "system") {
        localStorage.setItem(this._storageKey, theme);
      } else {
        localStorage.removeItem(this._storageKey);
      }
    }

    this.setAttribute("data-theme", theme);

    this.updateThemeFromConfig();

    this.dispatchEvent(
      new CustomEvent("ThemeChanged", {
        detail: { theme, isDark },
      })
    );

    if (this._onThemeChange) {
      this._onThemeChange(theme);
    }
  }

  private handleSystemChange = (): void => {
    if (!localStorage.getItem(this._storageKey)) {
      this.setTheme("system");
    }
  };

  private addEventListeners(): void {
    this.shadowRoot!.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const theme = (e.target as HTMLInputElement).value;
        this.setTheme(theme);
        this.updateActiveState(theme);
      });
    });
  }
}

export { ThemeSwitcher };