import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CustomButton() {
    return (
        <Link href="https://eduardev.com/" target="_blank" rel="noopener noreferrer">
            <Button
                variant="outline"
                className="flex items-center justify-center gap-3 border rounded-md px-3 py-1 w-48 whitespace-nowrap"
            >
                <span>Feito por EDUARDEV</span>
                <Image
                    src="/images/me.webp"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="size-6 rounded-full"
                />
            </Button>
        </Link>
    );
}