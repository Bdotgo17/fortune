import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [fortune, setFortune] = useState(null)
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const [checkoutId, setCheckoutId] = useState(null)

  const start = async () => {
    setLoading(true)
    setFortune(null)
    try {
      const r = await axios.post('http://localhost:4000/api/create-checkout')
      setCheckoutUrl(r.data.checkoutUrl)
      setCheckoutId(r.data.checkoutId)
      // If it's a simulated local URL, open in the same tab so user can "pay"
      window.location.href = r.data.checkoutUrl
    } catch (err) {
      console.error(err)
      alert('Failed to create checkout')
    } finally {
      setLoading(false)
    }
  }

  const claim = async () => {
    if (!checkoutId) return alert('No checkoutId')
    setLoading(true)
    try {
      const r = await axios.post('http://localhost:4000/api/fortune', { checkoutId })
      setFortune(r.data.fortune)
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error || 'Failed to fetch fortune')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Fortune Reader</h1>
      <p>Each fortune costs $1.00. Click below to start payment.</p>

      <button onClick={start} disabled={loading}>Get Fortune ($1)</button>

      {checkoutId && (
        <div style={{ marginTop: 20 }}>
          <p>After completing payment, click below to reveal your fortune.</p>
          <button onClick={claim} disabled={loading}>Reveal Fortune</button>
        </div>
      )}

      {fortune && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ddd' }}>
          <strong>Your fortune:</strong>
          <p>{fortune}</p>
        </div>
      )}
    </div>
  )
}
