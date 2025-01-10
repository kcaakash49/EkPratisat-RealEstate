import ListingCard from "@/components/ListingCard";
import { getListingService } from "@/services/getListingService";
import axios from "axios";

export default async function ListingsPage() {
  try {
    // const response = await axios.get("http://localhost:3000/api/getlisting");
    // console.log(response)
    // const data = response.data.data; // Extract the data from the API response

    const data: any = await getListingService();

    if (!data || data.length === 0) {
      return (
        <div className="font-bold text-7xl flex items-center justify-center h-full">
          No Records Found
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto pb-10">
        <div className="text-4xl font-bold font-custom pb-10">Trial Added</div>
        <div className="flex flex-wrap">
          {data.map((item: any, index: any) => (
            <div key={index} className="mx-4">
              <a href={`/listing/${item.id}`}>
                <ListingCard
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  price={item.price}
                  images={item.images}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="font-bold text-7xl flex items-center justify-center h-full">
        Error fetching data
      </div>
    );
  }
}