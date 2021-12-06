const forGenres = (selectedGenres: { id: any }[]) => {
  if (!selectedGenres.length) return "";
  const genreIds = selectedGenres.map((genre: { id: any }) => genre.id);
  return genreIds.toString();
};
export default forGenres;
