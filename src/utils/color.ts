/** Determines if the text color should be black or white based on the background color.
 * @param backgroundColor The background color for the text. Must be in six-digit hex form. (ex: #A0DB22)
 */
export const getContrastTextColor = (backgroundColor: string) => {
  const backgroundColorWithoutHash = backgroundColor.replaceAll("#", "");
  const hexSplit = backgroundColorWithoutHash
    .toUpperCase()
    .match(/[0-9A-F]{2}/g);

  const redValue = parseInt(hexSplit![0], 16);
  const greenValue = parseInt(hexSplit![1], 16);
  const blueValue = parseInt(hexSplit![2], 16);

  const brightness = Math.round(
    (redValue * 299 + greenValue * 587 + blueValue * 114) / 1000
  );

  const textColor = brightness > 125 ? "black" : "white";

  return textColor;
};
