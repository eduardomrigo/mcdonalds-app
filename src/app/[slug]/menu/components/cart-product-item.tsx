import { Minus, Plus, TrashIcon } from "lucide-react"
import Image from "next/image"
import { useContext } from "react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/fomat-currency"

import { CartContext, CartProduct } from "../contexts/cart"

interface CartItemProps {
    product: CartProduct
}


function CartProductItem({ product }: CartItemProps) {
    const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext)
    return (
        <div className="flex items-center justify-between">
            {/* esquerda */}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-100  rounded-xl">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    {/* quantidade */}
                    <div className="flex items-center gap-1 text-center">
                        <Button
                            variant={"outline"}
                            size={"cart"}
                            className="rounded-lg"
                            onClick={() => decreaseProductQuantity(product.id)}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xs w-7">{product.quantity}</p>
                        <Button
                            variant={"destructive"}
                            size={"cart"}
                            className="rounded-lg"
                            onClick={() => increaseProductQuantity(product.id)}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            {/* direita */}
            <Button
                variant={"outline"}
                size={"cart"}
                className="rounded-lg"
                onClick={() => removeProduct(product.id)}
            >
                <TrashIcon />
            </Button>
        </div>
    )
}

export default CartProductItem