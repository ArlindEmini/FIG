export const TOAST_CONSTANTS = {
  NORMAL: 'normal',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  CUSTOM: 'custom',
  SHORT: 'short',
  LONG: 'long',
}

/**
 * type: normal | success | warning | danger | custom
 * duration: normal | short | long
 * @param {String} type 
 * @param {String} duration 
 * @returns toastConfig
 */
export const toastConfig = (type = TOAST_CONSTANTS.NORMAL, duration = TOAST_CONSTANTS.NORMAL) => {
  const d = duration === TOAST_CONSTANTS.NORMAL ? 3000 : duration === TOAST_CONSTANTS.SHORT ? 1500 : 4500;

  return {
    type: type,
    placement: "top",
    duration: d,
    offset: 30,
    animationType: "slide-in",
  }
};
