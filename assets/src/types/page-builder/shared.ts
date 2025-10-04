export interface BorderOptions {
  enabled: number;
  width: {
    lg: number;
    md: number;
    xs: number;
  };
  color: string;
  style: string;
  radius: {
    lg: number;
    md: number;
    xs: number;
  };
}

export interface BackgroundImageOptions {
  url: string;
  repeat: string;
  position: string;
  attachment: string;
  size: string;
  overlay: string;
}

export interface BackgroundGradientOptions {
  type: 'radial' | 'linear';
  angle: string;
  start_color: string;
  start_pos: string;
  end_color: string;
  end_pos: string;
};
export type BackgroundOptions = {
  type: string;
  color: string;
  overlay: string;
  parallax: boolean;
  image: BackgroundImageOptions;
  gradient: BackgroundGradientOptions;
  video: {
    url: string;
    overlay: string;
  };
};

export type RwdOptions<T = string> = {
  xs: T;
  md: T;
  lg: T;
};

export type RwdSteps = 'xs' | 'md' | 'lg';

export type BoxShadowOptions = {
  enabled: number;
  color: string;
  hoffset: number;
  voffset: number;
  blur: number;
  spread: number;
};

export type AnimationOptions = {
  name: string;
  duration: number;
  delay: number;
};

export type TitleOptions = {
  text: string;
  element: string;
  font_size: RwdOptions;
  font_weight: string;
  color: string;
  margin_top: RwdOptions;
  margin_bottom: RwdOptions;
};
