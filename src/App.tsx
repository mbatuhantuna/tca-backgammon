import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <><div>
      <button className="btn">Hello daisyUI</button>
    </div><div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div></>
  
  );
}

export default App;
