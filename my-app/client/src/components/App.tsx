import { useEffect, useState } from "react";

export default function App() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setResult)
      .catch((e) => setResult({ ok: false, error: String(e) }));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Connection Test</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
