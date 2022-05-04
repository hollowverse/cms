import React, { useState } from 'react';
import { kgCall } from './kgCall';

export function KnowledgeGraph() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>(null);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            const results = await kgCall(value);

            setResults((await results.json()).itemListElement[0].result);
          }
        }}
        type="text"
        placeholder="Search for a celebrity name"
      ></input>

      {results && (
        <div className="mt-5 p-3 bg-white rounded-xl">
          <div className="flex w-full">
            <img
              src={results.image.contentUrl}
              width={150}
              className="rounded-lg"
            />
            <div className="ml-2">
              <div className="p-3">
                <h3 className="text-2xl">{results.name}</h3>
                <span>{results.description}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                <div className="mr-3">
                  <span className="text-gray-400 block">
                    Knowledge Graph ID
                  </span>
                  <span className="font-bold text-black text-xl">
                    {results['@id']}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
