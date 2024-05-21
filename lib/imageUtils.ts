// imageUtils.ts
export const uploadImage = async (image: File): Promise<string> => {
    try {
      // Simpan gambar ke penyimpanan yang sesuai (misalnya penyimpanan lokal atau penyimpanan awan)
      // Di sini, kita akan menganggap kita menyimpan gambar di penyimpanan lokal
      const imageURL = `/uploads/${image.name}`;
  
      // Anda dapat menyalin gambar ke direktori yang sesuai
      // Contoh: fs.copyFileSync(image.path, `/path/to/storage/${image.name}`);
  
      return imageURL; // Kembalikan URL gambar yang diunggah
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };
  