
import { useState } from 'react';
import './App.css';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [amount, setAmount] = useState('');
  const [odd, setOdd] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  
function calculate() {
  if (
    !amount.trim() ||
    !odd.trim() ||
    !repetitions.trim()
  ) {
    setError('Preenche todos os campos.');
    setResult(null);
    return;
  }

  const value = Number(amount);
  const multiplier = Number(odd);
  const times = Number(repetitions);

  if (
    !Number.isFinite(value) ||
    !Number.isFinite(multiplier) ||
    !Number.isSafeInteger(times) ||
    value <= 0 ||
    multiplier <= 0 ||
    times < 0
  ) {
    setError('Introduz valores válidos.');
    setResult(null);
    return;
  }

  const total = value * multiplier ** times;

  if (!Number.isFinite(total)) {
    setError('O resultado é demasiado grande.');
    setResult(null);
    return;
  }

  setError('');
  setResult(total);
}


  function clearForm() {
    setAmount('');
    setOdd('');
    setRepetitions('');
    setResult(null);
    setError('');
  }

  const formatMoney = (value: number) =>
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const profit =
    result !== null ? result - Number(amount) : null;

  return (
    <main className="app">
      <header className="header">
        <div className="brand-icon">↗</div>
        <div>
          <h1>Bet<span>Calculator</span></h1>
          <p>Calcula o teu retorno potencial</p>
        </div>
        <span className="tag">ODDS CALCULATOR</span>
      </header>

      <section className="dashboard">
        <div className="panel">
          <h2>Dados da aposta</h2>
          <p className="description">
            Preenche os campos para calcular o retorno estimado.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
          >
            <label htmlFor="amount">Valor da aposta (Kz)</label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="any"
              placeholder="Ex.: 1000"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <label htmlFor="odd">Odd</label>
            <input
              id="odd"
              type="number"
              min="0.01"
              step="any"
              placeholder="Ex.: 2.50"
              value={odd}
              onChange={(event) => setOdd(event.target.value)}
            />

            <label htmlFor="repetitions">Número de repetições</label>
            <input
              id="repetitions"
              type="number"
              min="0"
              step="1"
              placeholder="Ex.: 3"
              value={repetitions}
              onChange={(event) =>
                setRepetitions(event.target.value)
              }
            />

            <button className="calculate-button" type="submit">
              Calcular retorno
            </button>

            <button
              className="clear-button"
              type="button"
              onClick={clearForm}
            >
              Limpar campos
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="panel results-panel">
          <h2>O teu resultado</h2>
          <p className="description">
            Aqui encontrarás os valores calculados.
          </p>

          <div className="result-card highlight">
            <p>Retorno potencial</p>
            <strong>
              {result !== null
                ? `${formatMoney(result)} Kz`
                : '0,00 Kz'}
            </strong>
          </div>

          <div className="result-card">
            <p>Lucro potencial</p>
            <strong>
              {profit !== null
                ? `${formatMoney(profit)} Kz`
                : '0,00 Kz'}
            </strong>
          </div>

          <div className="notice">
            <strong>Informação importante</strong>
            <p>
              O retorno inclui o valor inicial. O lucro potencial
              é o retorno menos o valor apostado.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <span>Rápido</span>
        <span>Responsivo</span>
        <span>Gratuito</span>
      </footer>

      <Analytics />
    </main>
  );
}

export default App;
