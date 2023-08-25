import StarSvg from '../assets/star.svg';

interface IProps {
  rating: number;
}

export default function Rating(props: IProps) {
  return (
    <div className="flex w-fit">
      <StarSvg className={`h-5 w-5 stroke-pink-600 ${props.rating >= 1 ? 'fill-pink-600' : ''}`} />
      <StarSvg className={`h-5 w-5 stroke-pink-600 ${props.rating >= 2 ? 'fill-pink-600' : ''}`} />
      <StarSvg className={`h-5 w-5 stroke-pink-600 ${props.rating >= 3 ? 'fill-pink-600' : ''}`} />
      <StarSvg className={`h-5 w-5 stroke-pink-600 ${props.rating >= 4 ? 'fill-pink-600' : ''}`} />
      <StarSvg className={`h-5 w-5 stroke-pink-600 ${props.rating >= 5 ? 'fill-pink-600' : ''}`} />
    </div>
  );
}