// The Gameview component contains all components related to gameplay.

// The general flow of the Gameview will be: assembly => initialize => game

import React from 'react'
import Assembly from './assembly/Assembly'

export default function Gameview() {
  return (
    // <div>Gameview</div>
    <Assembly />
  )
}
