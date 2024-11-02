export default function ClothesItem({ product }) {
  return(
    <li className="w-[20rem] bg-[rgb(176,159,139)]  rounded-2xl overflow-hidden text-center shadow-lg">
      <article className="h-full flex flex-col justify-between">
        <img src={product.imageUrl} alt={product.name}  className="w-full h-80 object-cover"/>
        <div>
          <h3 className="text-2xl font-[bold] mx-0 my-3">{product.name}</h3>
          <p className="inline-block bg-[rgb(97,87,74)] text-[#ffc404] text-[0.9rem] font-[bold] rounded m-0 px-8 py-2 hover:bg-[rgb(82,74,63)] cursor-pointer">{product.price}</p>
          <p className="mb-2 mt-2">{product.description}</p> 
        </div>
        <p className="mb-6">
          <button className="bg-[rgb(97,87,74)] hover:bg-[rgb(82,74,63)] cursor-pointer rounded-md h-8 w-[8rem]">Add to Cart</button>
        </p>
      </article>
    </li>
  );
}