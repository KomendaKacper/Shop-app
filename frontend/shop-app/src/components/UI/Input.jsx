export default function Input( {label, id, ...props} ){
  return(
    <p className="my-0 mx-1 flex flex-col">
      <label htmlFor={id} className="font-bold mb-2 mx-2">{label}</label>
      <input id={id} name={id} {...props} required className="width-full mx-2 p-2 rounded-md border-solid border-gray-300 font-sans"/>
    </p>
  )
}