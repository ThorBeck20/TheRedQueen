import { useState, useEffect } from 'react';
import PMMarketSides from './PMMarketSides';
import polyMarketIconWhite from '../../assets/icon-white.svg';
import axios from 'axios';

function EventsPreview({ className="", slug, ...props}) {

    const [title, setTitle] = useState("");
    const [markets, setMarkets] = useState();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/polymarket/events/${slug}`
        ).then((response) => {
            setMarkets(response.data.event.markets);
            setTitle(response.data.event.title);
            setLoaded(true);
        })
    }, [slug]);

    return (
        <>
            {
                loaded ?
                    <div
                        className={`
                            bg-surface-raised
                            rounded-lg
                            min-w-50 min-h-20
                            theme-transition
                            ${className}`
                        }
                        {...props}
                    >
                        <div className="">
                            <div className="flex flex-row bg-blue-700 align-center rounded-tl-xl rounded-tr-xl shadow-lg">
                                
                                <img
                                    className=''
                                    style={{ maxHeight: '100px', maxWidth: '100px'}}
                                    src={polyMarketIconWhite}
                                />
                                
                                <h3 className="
                                    text-white
                                    p-2 text-balance
                                    max-w-70 font-bold text-xl
                                    "
                                >{title}</h3>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-row gap-2">
                                    <h3 className="min-h-10 min-w-50 text-text-primary text-lg font-bold">Market Side</h3>
                                    <div className="flex flex-row justify-end min-w-20 gap-2 px-5">
                                        <h3 className="text-green-500 font-bold text-lg min-w-20">Best Bid</h3>
                                        <h3 className="text-red-500 font-bold text-lg min-w-20">Best Ask</h3>
                                    </div>
                                </div>
                                <ul className="rounded-xl">
                                    {markets.map((market) => (
                                        <li key={market.id} className="bg-surface-raised theme-transition p-2 border-b last:border-b-0 first:border-t">
                                            <PMMarketSides json={market}/>
                                        </li>
                                    ))}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                :
                    <div className={`
                        min-w-50 min-h-30
                        ${className}`
                    }>
                        <div className="flex justify-center">
                            <div className="
                            w-6 h-6 border-3 border-gray-300
                            border-t-current rounded-full animate-spin
                            mt-10
                            "/>
                        </div>

                    </div>
            }
        
        </>
    )

}

export default EventsPreview;