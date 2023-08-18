import axios from "axios";

const getData = async () => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`);

  return res.data;
};

export default async function GrowerPage() {
  const data = await getData();

  console.log("data", data);
  return <main className='flex min-h-screen flex-col items-center justify-between p-24'>Hello!! {data.name}!</main>;
}
