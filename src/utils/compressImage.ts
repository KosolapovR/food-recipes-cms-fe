const getImageDimensions = (
  img: HTMLImageElement,
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    img.addEventListener('load', function () {
      const width = this.width;
      const height = this.height;
      resolve({ width, height });
    });
    img.onerror = function (e) {
      reject(e);
    };
    img.src = URL.createObjectURL(file);
  });
};

export const compressImage = async (file: File): Promise<File> => {
  try {
    const img = document.createElement('img');
    const { width, height } = await getImageDimensions(img, file);
    const canvas = document.createElement('canvas');
    const MAX_WIDTH = 640;
    const MAX_HEIGHT = 640;
    const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
    const resultWidth = width * ratio;
    const resultHeight = height * ratio;
    canvas.width = resultWidth;
    canvas.height = resultHeight;
    img.width = canvas.width;
    img.height = canvas.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) => {
      img.remove();
      ctx.canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: file.type }));
      }, 'image/jpeg');
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
