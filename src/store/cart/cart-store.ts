import type { CartProduct, Size } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[]

    getTotalItems: () => number

    getSummaryInformation: () => {
        subTotal: number
        tax: number
        total: number
        itemsInCart: number
    }
    addProductToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct, quantity: number) => void
    removeProduct: (product: CartProduct) => void
    clearCart: () => void
}

export const useCartStore = create<State>()(

    persist(

        (set, get) => ({
            cart: [],
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            getSummaryInformation: () => {
                const { cart } = get()
                const subTotal = cart.reduce((total, product) => (product.quantity * product.price) + total, 0)
                const tax = subTotal * 0.15
                const total = subTotal + tax
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart
                }

            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get()

                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                )
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }
                const updatedCartProduct = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item
                })

                set({ cart: updatedCartProduct })
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProduct = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item
                })
                set({ cart: updatedCartProduct })
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProduct = cart.filter(
                    item => item.id !== product.id || item.size !== product.size
                )
                set({ cart: updatedCartProduct })
            },
            clearCart: () => {
                set({ cart: [] })

            }

        })
        ,
        { name: 'shopping-cart' }
    )
)
