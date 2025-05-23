import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';

import { useDispatch } from'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({book}) => {
  const dispatch =  useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product))
  }
  
  return (
    <div className="rounded-lg transition-shadow duration-300 p-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
        <div className="w-full sm:w-auto sm:h-64 flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt=""
              className="w-full h-48 sm:h-64 object-contain p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>
    
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg sm:text-xl font-semibold hover:text-blue-600 mb-2">
                {book.title}
              </h3>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 mb-3">
              {book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}
            </p>
            <p className="font-medium mb-3">
              ${book?.newPrice} <span className="line-through font-normal ml-2">$ {book?.oldPrice}</span>
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary w-full sm:w-auto px-4 py-2 text-sm sm:text-base flex items-center justify-center gap-2">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
