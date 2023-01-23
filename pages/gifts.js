import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [gender, setGender] = useState('man');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/generate-gifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>GRAAL</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>GRAAL</h3>
        <form onSubmit={onSubmit}>
          <label>A qui souhaitez-vous l'offrir ?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Un homme</option>
            <option value="woman">Une femme</option>
          </select>

          <label>Âge</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Entrez l'âge"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Montant minimum</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Entrez le montant minimum"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>Montant maximum</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Entrez le montant maximum"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Centres d'intérêts</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Entrez les centres d'intérêts"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Trouver le cadeau idéal" />
        </form>
        {loading && (
          <div>
            <h3>En recherche des meilleures idées 💡</h3>
            <img src="/loading.gif" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}