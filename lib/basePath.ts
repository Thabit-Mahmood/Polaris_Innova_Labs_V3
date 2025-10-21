// Base path for GitHub Pages deployment
export const basePath = process.env.NODE_ENV === 'production' ? '/Polaris_Innova_Labs_V3' : '';

export const getAssetPath = (path: string) => {
  return `${basePath}${path}`;
};
