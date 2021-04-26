export type ErrorSize = 'lg' | 'md' | 'sm';

const ERROR_SIZES = {
  LG: 'lg' as ErrorSize,
  MD: 'md' as ErrorSize,
  SM: 'sm' as ErrorSize,
};
export const getContainerStyles = (size: ErrorSize): string =>
  ({
    [ERROR_SIZES.LG]: `
      padding: 1rem 2rem;
      line-height: 26px;
    `,
    [ERROR_SIZES.MD]: `
      padding: 1rem;
      line-height: 24px;
    `,
    [ERROR_SIZES.SM]: `
      padding: 0.5rem;
      line-height: 20px;
      display: flex;
      align-items: center;
    `,
  }[size]);

export const getIconSize = (size: ErrorSize): number =>
  ({
    [ERROR_SIZES.LG]: 26,
    [ERROR_SIZES.MD]: 21,
    [ERROR_SIZES.SM]: 18,
  }[size]);

export const getIconStyle = (size: ErrorSize): string =>
  ({
    [ERROR_SIZES.LG]: 'padding-right: 15px',
    [ERROR_SIZES.MD]: 'padding-right: 15px',
    [ERROR_SIZES.SM]: '',
  }[size]);

export const getTitleStyle = (size: ErrorSize): string =>
  ({
    [ERROR_SIZES.LG]: `
      margin: 0.5rem 0 1rem;
      font-size: 24px;
      line-height: 38px;
    `,
    [ERROR_SIZES.MD]: `
      margin: 0rem;
      padding-bottom: 0.4rem;
      font-size: 16px;
      line-height: 20px;
    `,
    [ERROR_SIZES.SM]: `
      margin: 0rem,
      line-height: 16px;
    `,
  }[size]);
