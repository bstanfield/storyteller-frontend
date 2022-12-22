/** @jsxImportSource @emotion/react */

import { jsx } from '@emotion/react'
import { scale } from '../styles/scale';
import { useEffect, useState } from 'react'

const buttonStyles = (inactive, darkmode, backgroundColor) => scale({
  display: 'inline-block',
  margin: 0,
  padding: 8,
  backgroundColor: backgroundColor ? backgroundColor : inactive ? 'transparent' : darkmode ? '#333' : '#eee',
  fontSize: 13,
  color: darkmode ? '#f5f5f5' : '#333333',
  borderRadius: 2,
  fontFamily: 'JetBrains Mono, monospace',
  cursor: inactive ? 'inherit' : 'pointer',
  border: '1px solid transparent',
  '&:hover': {
    border: inactive ? '1px solid transparent' : darkmode ? '1px solid #eee' : '1px solid #333',
  }
})

export default function Button({ props }) {
  const {
    text,
    icon,
    inactive,
    darkmode,
    onClickFn,
    backgroundColor,
  } = props
  const [status, setStatus] = useState('incorrect')

  return (
    <button>{text}</button>
  )


}