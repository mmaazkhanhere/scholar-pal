import showdown from 'showdown';

const converter = new showdown.Converter();

export const markdownToHtml = (markdown: string): string => {
    return converter.makeHtml(markdown);
};
