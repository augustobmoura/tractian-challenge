/**
 * This tag function is used to create URLs from template strings.
 * It encodes the values in the template string and concatenates them with the strings.
 * This is made to sanitize the values and prevent injection attacks.
 *
 * @example
 * const id = '123//456'
 * const url = url`/companies/${id}/assets`
 * console.log(url) // '/companies/123%2F%2F456/assets'
 */
export const urlPath = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce((prev, next, i) => {
    const value = encodeURIComponent(values[i - 1]);
    const cleanedPrev = prev.endsWith('/') ? prev.slice(0, -1) : prev;
    const cleanedNext = next.startsWith('/') ? next.slice(1) : next;

    return `${cleanedPrev}/${value}/${cleanedNext}`;
  });
