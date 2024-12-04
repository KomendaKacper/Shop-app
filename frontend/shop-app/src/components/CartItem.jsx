export default function CartItem( {name, quantity, price, onIcrease, onDecrease} ){
  return(
  <li className="flex justify-between items-center mx-0 my-2">
    <p className="m-0">{name} - {quantity} x {price.toFixed(2)}</p>
    <p className="flex gap-4 items-center">
      <button onClick={onDecrease} className="cursor-pointer border-[none] size-4 w-6 h-6 rounded-xl bg-[#312c1d] text-[#ffc404] flex justify-center items-center hover:bg-[#1d1a16] hover:text-[#ffab04]">-</button>
      <span>{quantity}</span>
      <button onClick={onIcrease} className="cursor-pointer border-[none] size-4 w-6 h-6 rounded-xl bg-[#312c1d] text-[#ffc404] flex justify-center items-center hover:bg-[#1d1a16] hover:text-[#ffab04]">+</button>
    </p>
  </li>
)
}