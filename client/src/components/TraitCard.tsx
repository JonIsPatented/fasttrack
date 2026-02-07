import React from 'react';
import '../styles/cards.css'
interface TraitCardProps {
  label: string;
  value: string | number;
}

export default function TraitCard({ label, value }) {
  return (
    <div className="trait-card">
      <span className="trait-label">{label}</span>
      <span className="trait-value">{value}</span>
    </div>
  )
}


