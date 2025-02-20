import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ({children}: {children: React.ReactNode}){
    return (
        <div className="flex flex-col h-full">
            <Header/>
            <div className="flex-grow">
                {children}
            </div>
            {/* <Footer/> */}
        </div>
    )
}