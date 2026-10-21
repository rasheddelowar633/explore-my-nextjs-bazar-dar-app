
const Marquee = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products?category=chal"
    );

    const data = await res.json();

    return (
        
       <div className="flex container mx-auto mt-5">
        <div className="font-bold text-3xl bg-red-500 text-white pt-2 p-3">সর্বশেষ</div>
         <div className="container mx-auto font-bold bg-gray-900 text-white py-3 px-1    overflow-hidden">
            <marquee behavior="scroll" direction="left" scrollamount="5">
                {data.map((item) => {
                    const isUp = item.change?.dir === "up";

                    return (
                        <span key={item.id} className="mx-10 inline-block">

                            {/* Product Information */}
                            <span className="font-bold text-lg">
                                {item.categoryIcon} {item.nameBn}
                            </span>

                            <span className="mx-3">|</span>

                            {/* Today's Price */}
                            <span>
                                আজ: <strong>৳{item.today}/{item.unit}</strong>
                            </span>

                            <span className="mx-2">|</span>

                            {/* Yesterday */}
                            <span>
                                গতকাল: ৳{item.yesterday}/{item.unit}
                            </span>

                            <span className="mx-2">|</span>

                            {/* Last Week */}
                            <span>
                                গত সপ্তাহ: ৳{item.lastWeek}/{item.unit}
                            </span>

                            <span className="mx-2">|</span>

                            {/* Last Month */}
                            <span>
                                গত মাস: ৳{item.lastMonth}/{item.unit}
                            </span>

                            <span className="mx-2">|</span>

                            {/* Price Change */}
                            <span
                                className={`font-bold ${isUp ? "text-red-400" : "text-green-400"
                                    }`}
                            >
                                {isUp ? "▲ বেড়েছে" : "▼ কমেছে"}{" "}
                                {Math.abs(item.change?.pct)}%
                            </span>

                            {/* Market Information */}
                            {item.markets?.map((market, index) => (
                                <span key={index} className="ml-6">
                                    <span className="text-yellow-300">
                                        📍 {market.market}
                                    </span>{" "}
                                    ({market.division}): ৳{market.min} - ৳{market.max}/
                                    {item.unit}
                                </span>
                            ))}

                            {/* Product Separator */}
                            <span className="mx-10 text-gray-500">
                                ★★★★★
                            </span>

                        </span>
                    );
                })}
            </marquee>
        </div>
       </div>
    );
};

export default Marquee;
