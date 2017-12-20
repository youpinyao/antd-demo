import React from 'react';

export function renderAcccount(text, row) {
  if (row.hasPermission === 0) {
    return row.real_name;
  }

  return (
    <a href={row.jump_url} target="_blank">
      {row.real_name}
    </a>
  );
}
