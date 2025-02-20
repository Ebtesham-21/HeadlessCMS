import Image from "next/image";
import banner from "@/assets/banner.png";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
   <main className="max-w-7xl mx-auto px-5 py-10 space-y-10">
    <div className="flex items-center bg-secondary md:h-96">
      <div className="space-y-7 p-10 text-center md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold">
        LET’S READ
        SOMETHING
        DIFFERENT! 

        </h1>
        <p>
          Check Out Our Books.
        </p>
        <Button asChild>
           <Link href="/shop">
           Shop Now  <ArrowRight className="ml-2 size-5"/>
           </Link>
        </Button>



      </div>
      <div className=" relative hidden md:block w-1/2 h-full">
        <Image 
          src={banner}
          alt="99 Books Banner"
          className="h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-700 to-red-900"/>

      
      </div>
    </div>
    <Suspense fallback={<LoadingSkeleton/>}>
    <FeaturedProducts/>
    </Suspense>


   </main>
  );
}


async function FeaturedProducts() {
  await delay(1000);

  const wixClient = getWixClient();
  const {collection} = await wixClient.collections.getCollectionBySlug("our-latest-additions");

  if(!collection?._id) {
    return null;
  }


  const featuredProducts = await wixClient.products.queryProducts()
  .hasSome("collectionIds", [collection._id] )
  .descending("lastUpdated")
  .find();

  if(!featuredProducts.items.length) {
    return null;
  }

  return (<div className="space-y-5">
    <h2 className="text-2xl font-bold">Our Latest Editions</h2>
    <div className="flex gap-5 flex-col  sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {featuredProducts.items.map(product => (
        <Product key={product._id} product={product} />

      ))}
    </div>
    <pre>
      {JSON.stringify(featuredProducts, null, 2)}
    </pre>
  </div>

);}

function LoadingSkeleton () {
  return( <div className="flex gap-5 grid-cols-2 flex-col sm:grid md:grid">
    {
      Array.from ({length: 3}).map((_, i) => (
        <Skeleton key={i} className="h-[20rem] w-[30rem]"/>
      ))
    }
  </div>
  );
}
