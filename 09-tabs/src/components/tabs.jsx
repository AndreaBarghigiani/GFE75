import { useState } from 'react';
import { clsx } from 'clsx';

export default function Tabs({ items }) {
  const [openTab, setOpenTab] = useState('html');

  const handleClick = (e) => {
    e.preventDefault();
    setOpenTab(e.target.id);
  };

  return (
    <div>
      <div className="space-x-2">
        {items.map((item) => (
          <button
            className={clsx('p-1.5 border bg-slate-200', {
              'text-blue-500 border-blue-500': openTab === item.id,
            })}
            key={item.id}
            id={item.id}
            onClick={handleClick}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="content" aria-live="polite">
        {items.map((item) => (
          <p
            data-content-id={item.id}
            className={clsx({
              hidden: openTab !== item.id,
              visible: openTab === item.id,
            })}
          >
            {item.content}
          </p>
        ))}
      </div>
    </div>
  );
}
