export default function ClothesItem({ product }) {
  return(
    <li className="w-[20rem] bg-black rounded-2xl overflow-hidden text-center shadow-sm">
      <article className="h-full flex flex-col justify-between">
        <img src={product.image} alt={product.name}  className="w-full h-80 object-cover"/>
        <div>
          <h3 className="text-2xl font-[bold] mx-0 my-3">{product.name}</h3>
          <p className="inline-block bg-[#312c1d] text-[#ffc404] text-[0.9rem] font-[bold] rounded m-0 px-8 py-2">{product.price}</p>
          <p className="mb-4">{product.description}</p> 
        </div>
        <p className="mb-6">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}