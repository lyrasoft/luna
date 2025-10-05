interface LocaleSwitchOptions {
    type: string;
    table: string;
    routeName: string;
    currentId: string;
    defaultId: string;
    inputId: string;
    langField: string;
    titleField: string;
    triggerInputName: string;
}
export declare class LocaleSwitchModal {
    el: HTMLElement;
    options: LocaleSwitchOptions;
    constructor(el: HTMLElement, options?: Partial<LocaleSwitchOptions>);
    validateForm(): HTMLFormElement | undefined;
    /**
     * @param {HTMLButtonElement} button
     */
    saveCurrentAndCreateLang(button: HTMLAnchorElement | HTMLButtonElement): void;
    switchLang(button: HTMLAnchorElement | HTMLButtonElement): void;
}
export {};
