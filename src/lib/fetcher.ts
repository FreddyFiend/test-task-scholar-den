const fetcher = (query: string) => fetch(`${query}`).then((res) => res.json());
export default fetcher;
