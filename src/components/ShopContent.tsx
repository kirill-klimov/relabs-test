import { shopData } from "../helpers/shop-data";
import { formatPrice } from "../helpers/utils";
import Rating from "./Rating";
import HeartSvg from '../assets/heart.svg';
import MirSvg from '../assets/mir-logo.svg';

export default function ShopContent() {
  return (
    <div className="flex flex-wrap gap-8">
      {
        shopData.map(item => {
          return (
            <a
            href="#"
            className={`bg-white shadow border rounded-2xl p-3 hover:shadow-xl h-fit
            transition w-full max-w-[280px] cursor-pointer hover:text-inherit`} 
            key={item.id}>
              <div className="h-[350px] w-full rounded-md overflow-hidden relative [&>.canvas]:hover:opacity-100 mb-4">
                <div className="canvas grid place-items-center opacity-0 transition-opacity">
                  <span className="cursor-pointer bg-white/90 px-4 py-2 rounded-full">Быстрый просмотр</span>
                </div>
                <img
                className="w-full h-auto" 
                src={item.img} alt={item.description} />
                <span className={`font-bold text-sm text-pink-600 bg-pink-100 block
                absolute bottom-1 left-1 px-2 rounded-full`}>
                  -{String(Math.floor(Math.random() * 100))}%
                </span>
              </div>

              <div className="flex items-center font-bold tracking-tight">
                <span className="text-lg mr-2">{formatPrice(item.price)}{` `}₽</span>
                <span className="line-through text-gray-500">{formatPrice(item.old_price)}{` `}₽</span>
              </div>
              <div className="my-1 flex items-center">
                <span className="text-pink-600 font-bold tracking-tight">{formatPrice(item.sale_price)}{` `}₽</span>
                <MirSvg className="h-2 w-auto ml-2 translate-y-[1px]" />
              </div>
              <div>
                <span className="text-gray-400 tracking-wide font-medium">{item.description}</span>
              </div>
              <div className="my-2 flex items-center gap-1">
                <Rating rating={item.rating} />
                <span className="text-gray-400">{Math.floor(Math.random() * 100)}</span>
              </div>
              {
                !item.has_installment ? <></> :
                <div className="bg-gradient-to-r from-green-200 to-yellow-200 w-fit py-2 px-4 rounded-full">
                  <span className="font-bold uppercase">Рассрочка 0-0-6</span>
                </div>
              }
              <div className="my-3 flex items-center">
                <button className="button pink">В корзину</button>
                <HeartSvg className={`h-6 w-6 ml-4 stroke-pink-600 hover:scale-110 transition
                ${item.favorite ? 'fill-pink-600' : ''}`} />
              </div>
            </a>
          );
        })
      }
    </div>
  );
}