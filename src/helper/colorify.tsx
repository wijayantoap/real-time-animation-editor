// Note: Most of the functions are taken from lottie-colorify with some modification
import { LottieJson } from '../pages/Editor';

export const convertColorToLottieColor = (color: string | number[] | undefined) => {
  if (typeof color === 'string' && color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!result) {
      throw new Error('Color can be only hex or rgb array (ex. [10,20,30])');
    }
    return [
      Math.round((parseInt(result[1], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[2], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[3], 16) / 255) * 1000) / 1000,
    ];
  } else if (typeof color === 'object' && color.length === 3 && color.every((item) => item >= 0 && item <= 255)) {
    return [Math.round((color[0] / 255) * 1000) / 1000, Math.round((color[1] / 255) * 1000) / 1000, Math.round((color[2] / 255) * 1000) / 1000];
  } else if (!color) {
    return undefined;
  } else {
    throw new Error('Color can be only hex or rgb array (ex. [10,20,30])');
  }
};

const cloneDeep = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(cloneDeep);
  }

  const clonedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = cloneDeep(obj[key]);
    }
  }

  return clonedObj;
};

export const replaceFirstColor = (sourceColor: string | number[], targetColor: string | number[], lottieObj: any, immutable = true) => {
  const genSourceLottieColor = convertColorToLottieColor(sourceColor);
  const genTargetLottieColor = convertColorToLottieColor(targetColor);
  if (!genSourceLottieColor || !genTargetLottieColor) {
    throw new Error('Proper colors must be used for both source and target');
  }

  let replacementDone = false;

  function doReplace(sourceLottieColor: number[], targetLottieColor: number[], obj: any) {
    if (replacementDone) return obj;

    if (obj?.s?.length === 4) {
      if (sourceLottieColor[0] === obj.s[0] && sourceLottieColor[1] === obj.s[1] && sourceLottieColor[2] === obj.s[2]) {
        obj.s = [...targetLottieColor, 1];
        replacementDone = true;
      }
    } else if (Array.isArray(obj?.c?.k)) {
      if (typeof obj.c.k[0] !== 'number') {
        doReplace(sourceLottieColor, targetLottieColor, obj.c.k);
      } else if (
        sourceLottieColor[0] === round(obj.c.k[0]) &&
        sourceLottieColor[1] === round(obj.c.k[1]) &&
        sourceLottieColor[2] === round(obj.c.k[2])
      ) {
        obj.c.k = targetLottieColor;
        replacementDone = true;
      }
    } else {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          doReplace(sourceLottieColor, targetLottieColor, obj[key]);
          if (replacementDone) break;
        }
      }
    }

    return obj;
  }

  return doReplace(genSourceLottieColor, genTargetLottieColor, immutable ? cloneDeep(lottieObj) : lottieObj);
};

export const replaceColor = (
  sourceColor: string | number[],
  targetColor: string | number[],
  lottieObj: any,
  index: number | null = null,
  immutable = true,
) => {
  const genSourceLottieColor = convertColorToLottieColor(sourceColor);
  const genTargetLottieColor = convertColorToLottieColor(targetColor);
  if (!genSourceLottieColor || !genTargetLottieColor) {
    throw new Error('Proper colors must be used for both source and target');
  }

  function doReplace(sourceLottieColor: number[], targetLottieColor: number[], obj: any) {
    if (obj?.s?.length === 4) {
      if (sourceLottieColor[0] === obj.s[0] && sourceLottieColor[1] === obj.s[1] && sourceLottieColor[2] === obj.s[2]) {
        if (index === null) {
          obj.s = [...targetLottieColor, 1];
        } else if (index === 0) {
          obj.s = [...targetLottieColor, 1];
        } else {
          index--; // Decrement index if color matches and index is provided
        }
      }
    } else if (obj?.c?.k) {
      if (Array.isArray(obj.c.k) && typeof obj.c.k[0] !== 'number') {
        doReplace(sourceLottieColor, targetLottieColor, obj.c.k);
      } else if (
        sourceLottieColor[0] === round(obj.c.k[0]) &&
        sourceLottieColor[1] === round(obj.c.k[1]) &&
        sourceLottieColor[2] === round(obj.c.k[2])
      ) {
        if (index === null) {
          obj.c.k = targetLottieColor;
        } else if (index === 0) {
          obj.c.k = targetLottieColor;
        } else {
          index--; // Decrement index if color matches and index is provided
        }
      }
    } else {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          doReplace(sourceLottieColor, targetLottieColor, obj[key]);
        }
      }
    }

    return obj;
  }

  // Make a deep clone if immutable is true
  const modifiedLottie = immutable ? cloneDeep(lottieObj) : lottieObj;

  // Call the recursive function to replace the color at the specified index or all occurrences
  doReplace(genSourceLottieColor, genTargetLottieColor, modifiedLottie);

  return modifiedLottie;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

const convertLottieColorToRgb = function (lottieColor: number[]) {
  return [Math.round(lottieColor[0] * 255), Math.round(lottieColor[1] * 255), Math.round(lottieColor[2] * 255)];
};

const convertLottieColorToRgba = function (lottieColor: number[]) {
  return [Math.round(lottieColor[0] * 255), Math.round(lottieColor[1] * 255), Math.round(lottieColor[2] * 255), lottieColor[3]];
};

export const getColors = function (lottieObj: LottieJson) {
  var res: any[][] = [];
  function doGet(obj: any) {
    if (obj?.s && Array.isArray(obj?.s) && obj?.s.length === 4) {
      res.push(convertLottieColorToRgba(obj.s));
    } else if (obj?.c && obj?.c?.k) {
      if (Array.isArray(obj?.c?.k) && typeof obj?.c?.k[0] !== 'number') {
        doGet(obj.c.k);
      } else {
        res.push(convertLottieColorToRgb(obj.c.k));
      }
    } else {
      for (var key in obj) {
        if (typeof obj[key] === 'object') {
          doGet(obj[key]);
        }
      }
    }
    return res;
  }
  doGet(lottieObj);
  return res;
};

export const rgbToHex = (rgb: number[]) => {
  return (
    '#' +
    rgb
      .map((component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};
