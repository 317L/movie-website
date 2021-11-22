interface INT {
  map: any;
  length: any;
}
const useGenres = (selectedGenres: INT) => {
  if (selectedGenres.length < 1) return "";

  const GenreIds = selectedGenres.map((g: { id: any }) => g.id);
  return GenreIds.reduce((acc: string, curr: string) => acc + "," + curr);
};
export default useGenres;
