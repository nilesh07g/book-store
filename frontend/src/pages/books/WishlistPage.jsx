import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice'
import BookCard from './BookCard'

const WishlistPage = () => {
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems)
    const dispatch = useDispatch()

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="relative">
                            <BookCard book={item} />
                            <button
                                onClick={() => dispatch(removeFromWishlist(item))}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WishlistPage