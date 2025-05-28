import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice'

const BookCard = ({book}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const isInWishlist = wishlistItems.some(item => item._id === book._id);

  const handleAddToCart = (product) => {
      dispatch(addToCart(product))
  }

  const handleWishlist = (product) => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product))
    } else {
      dispatch(addToWishlist(product))
    }
  }
  
  return (
    <div className="rounded-lg transition-shadow duration-300 p-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 h-full">
        <div className="w-full sm:w-auto sm:h-64 flex-shrink-0 border rounded-md relative">
          <button 
            onClick={() => handleWishlist(book)}
            className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm group"
          >
            {isInWishlist ? (
              <HiHeart className="size-6 text-red-500 transform group-hover:scale-110 transition-transform" />
            ) : (
              <HiOutlineHeart className="size-6 text-gray-600 hover:text-red-500 transform group-hover:scale-110 transition-transform" />
            )}
          </button>
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
