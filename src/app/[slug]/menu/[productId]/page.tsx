import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductHeader from "./components/productHeader";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>
}

async function ProductPage({ params }: ProductPageProps) {
    const { slug, productId } = await params
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        return notFound()
    }

    return (
        <>
         <ProductHeader product={product} />
        </>

    )
}

export default ProductPage