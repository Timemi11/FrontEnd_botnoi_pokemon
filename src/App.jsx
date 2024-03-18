import { React, useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [name, setname] = useState([]);
  const [name_ele, setname_ele] = useState([]);
  const [namebase_stat, setnamebase_stat] = useState([]);
  const [base_stat, setbase_stat] = useState([]);
  const [imagefront, setimagefront] = useState(null);
  const [imageback, setimageback] = useState(null);
  const [number, setnumber] = useState(0);
  const [tgoutput, toggleoutput] = useState(false);

  // useEffect คือการรอให้ react render dom ขึ้นมาก่อนแล้วค่อยทำในส่วนนี้ เหมือนเป็นการ delay code
  useEffect(() => {
    async function fetchApi(url) {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      return data;
    }
    async function getpokemon() {
      const url = "https://pokeapi.co/api/v2/pokemon?offset=0&amp;limit=151";
      const pokemonData = await fetchApi(url);
      const pokemonList = pokemonData.results;
      const names = pokemonList.map((items) => items.name);
      setname(names);

      // console.log("in getpokemon " + number);
      const firstPokemonUrl =
        "https://pokeapi.co/api/v2/pokemon/" + (number + 1) + "/";
      const firstPokemonData = await fetchApi(firstPokemonUrl);

      console.log(firstPokemonUrl);

      const baseStats = firstPokemonData.stats.map((stat) => stat.base_stat);
      const statNames = firstPokemonData.stats.map((stat) => stat.stat.name);
      const types = firstPokemonData.types.map((type) => type.type.name);
      const back = firstPokemonData.sprites.back_default;
      const front = firstPokemonData.sprites.front_default;

      setimagefront(front);
      setimageback(back);
      setbase_stat(baseStats);
      setnamebase_stat(statNames);
      setname_ele(types);

      // console.log(front);
      // console.log(back);
      // console.log(baseStats);
      // console.log(statNames);
      // console.log(types);
    }

    getpokemon();
  }, [number]);

  function prevbtn() {
    console.log(number);
    if (number <= 0) {
      setnumber(name.length - 1);
      return;
    }
    let num = number - 1;
    setnumber(num);
  }
  function nextbtn() {
    if (number >= name.length - 1) {
      setnumber(0);
      return;
    }
    let num = number + 1;
    setnumber(num);
  }

  return (
    <div className="pokemon-list">
      <h1>API</h1>
      <h1>POKEMON</h1>
      <input
        type="button"
        id="getoutput"
        value="Get pokemon dex"
        onClick={() => {
          toggleoutput(!tgoutput);
        }}
      />
      <div className={`output ${tgoutput ? "open" : ""}   `}>
        <div>
          <input
            type="button"
            name="prev"
            id="prev"
            onClick={prevbtn}
            value="prev"
          />
          <input
            type="button"
            name="next"
            id="next"
            onClick={nextbtn}
            value="next"
          />

          <div className="image">
            <img src={imagefront} alt="front" />
            <img src={imageback} alt="back" />
          </div>
          <p>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Name:</span>{" "}
            {name[number]}
          </p>
          {name_ele.map((item, index) => (
            <p key={index}>
              <span style={{ fontWeight: "bold" }}>Type {index + 1}:</span>{" "}
              {item}
            </p>
          ))}

          <div className="stat">
            <div className="stat_name">
              {namebase_stat.map((item, index) => (
                <p key={index}>
                  <span>{item} : </span>
                </p>
              ))}
            </div>
            <div className="number_stat">
              {base_stat.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
