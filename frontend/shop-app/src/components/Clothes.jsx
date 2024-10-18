import React, { useEffect, useState } from "react";

export default function Clothes({ clothes }) {
  return (
    <ul className="products">
      {clothes.map((clothes) => (
        <li key={clothes.id}>
          <article className="product">
            <img />
            <div className="product-content">
              <div>
                <h3>{clothes.name}</h3>
                <p>{clothes.description}</p>
                <p>{clothes.price}</p>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
