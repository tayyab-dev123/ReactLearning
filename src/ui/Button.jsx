import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ children, disabled, to, type }) => {
  const base =
    'inline-block rounded-full bg-yellow-400  font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed text-sm ';

  const style = {
    primary: base + ' px-3 py-3 md:px-4 md:py-4',
    small: base + ' px-2 py-2 text-xs md:px-3 md:py-3',
    Secondary:
      'px-3 py-3 md:px-4 md:py-4 inline-block rounded-full bg-transparent font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed text-sm ',
  };

  if (to) {
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
};
