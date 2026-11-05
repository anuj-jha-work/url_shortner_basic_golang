import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [url, setUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function shortenUrl(event) {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not shorten URL");
      setShortUrl(`${apiUrl}/${data.short}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">GO URL SHORTENER</p>
        <h1>Make links shorter.</h1>
        <p className="subtitle">Paste a long URL and get a shareable link.</p>
        <form onSubmit={shortenUrl}>
          <input
            type="url"
            placeholder="https://example.com/your-long-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
        {shortUrl && (
          <div className="result">
            <span>Your short URL</span>
            <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
