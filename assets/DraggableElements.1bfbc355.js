import{E as i}from"./ElementDragAndDrop.5d17057f.js";import{j as e,a as m,F as c}from"./index.a989dd2b.js";const x=({pokemons:t,score:a,maxDragggableElements:r,resetGame:s})=>e("div",{className:"flex flex-wrap justify-around gap-2.5 h-min p-6",children:a===r?m("div",{className:"flex flex-col justify-center items-center",children:[e("p",{className:"text-white text-lg text-center mb-4",children:"Ganaste!!!"}),e("button",{className:"h-10 px-6 font-semibold rounded-md bg-black text-white",onClick:()=>s(),children:"Restart"})]}):e(c,{children:Array.from(t.entries()).map(([l,n])=>e(i,{pokemon:n},l))})});export{x as default};
