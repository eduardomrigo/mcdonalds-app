"use client"

import { Prisma } from "@prisma/client"
import { ChefHatIcon, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useContext, useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency } from "@/helpers/fomat-currency"

import CartSheet from "../../components/cart-sheet"
import { CartContext } from "../../contexts/cart"

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    }>
}


function ProductDetail({ product }: ProductDetailProps) {
    const { toggleCart, addProduct } = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1)

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev === 1) {
                return 1
            }
            return prev - 1
        })
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleAddToCart = () => {
        addProduct({
            ...product,
            quantity
        })
        toggleCart()
    }

    return (
        <>
            <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex-auto flex flex-col overflow-hidden">
                <div className="flex-auto overflow-hidden">
                    {/* restaurante */}
                    <div className="flex items-center gap-1.5 ">
                        <Image
                            src={product.restaurant.avatarImageUrl}
                            alt={product.restaurant.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                        />
                        <p className="text-sm text-muted-foreground">{product.restaurant.name}</p>
                    </div>

                    {/* nome produto */}
                    <h2 className="text-xl mt-1 font-semibold">
                        {product.name}
                    </h2>

                    {/* preco e quantidade */}
                    <div className="flex items-center justify-between mt-3 ">
                        <h3 className="text-xl font-semibold">
                            {formatCurrency(product.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button variant={"outline"} className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                                <Minus />
                            </Button>
                            <p className="w-4">{quantity}</p>
                            <Button variant={"destructive"} className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                                <Plus />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="h-full">
                        {/* sobre */}
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>

                        {/* ingredientes */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-1">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ScrollArea className="h-40">
                            <ul className="list-disc px-5 text-sm text-muted-foreground">
                                {product.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </ScrollArea>
                        </div>
                    </ScrollArea>
                </div>

                <Button className="rounded-full mt-6 w-full" onClick={handleAddToCart}>
                    Adicionar à sacola
                </Button>
            </div>
            <CartSheet />
        </>
    )
}

export default ProductDetail