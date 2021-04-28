import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      accent2: string;
      accent2_dark: string;
      accent2_light: string;
      accent3: string;
      accent3_alternate: string;
      accent3_dark: string;
      accent: string;
      accent_dark: string;
      accent_light: string;
      accent_light_rgb: string;
      black: string;
      canada: string;
      error: string;
      error_1: string;
      error_dark: string;
      grey_1: string;
      grey_2: string;
      grey_3: string;
      grey_4: string;
      grey_5: string;
      grey_6: string;
      grey_highlight: string;
      primary: string;
      primary_dark: string;
      primary_light: string;
      secondary: string;
      secondary_1: string;
      secondary_2: string;
      secondary_accessible: string;
      secondary_dark: string;
      secondary_light: string;
      success: string;
      warning: string;
      warning_dark: string;
      white: string;
    };

    dimensions: {
      navbar: {
        height: number;
      };
      footer: {
        height: number;
      };
      facets: {
        width: number;
      };
    };

    shadow: {
      default: string;
      right: string;
    };

    typography: {
      baseFont: SerializedStyles;
      button: SerializedStyles;
      data: SerializedStyles;
      heading: SerializedStyles;
      label: SerializedStyles;
      label2: SerializedStyles;
      regular: SerializedStyles;
      subheading: SerializedStyles;
      subheading2: SerializedStyles;
    };
  }
}
