/*provides a utility function that encapsulates the conversion of markdown text
to html using showdown library */

import showdown from 'showdown';

const converter = new showdown.Converter();

export const markdownToHtml = (markdown: string): string => {
    return converter.makeHtml(markdown);
};
