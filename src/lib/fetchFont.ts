export const fetchFonts = async () => {
  try {
    const fontUrls = [
      "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap",
      "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    ];

    const fetchFonts = fontUrls.map((url) => fetch(url));
    await Promise.all(fetchFonts);
    console.log("Fontes carregadas com sucesso");
  } catch (error) {
    console.error("Erro ao carregar as fontes:", error);
  }
};
