export enum AspectRatio {
  Square = '1:1',
  Portrait_3_4 = '3:4',
  Portrait_9_16 = '9:16',
  Landscape_4_3 = '4:3',
  Landscape_16_9 = '16:9',
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
  timestamp: number;
}

export interface GenerationConfig {
  prompt: string;
  aspectRatio: AspectRatio;
}

export interface ApiError {
  message: string;
  details?: string;
}