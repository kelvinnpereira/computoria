import { FaBox } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const Avaliações = ({ items, media = 0 }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex flex-row items-center justify-start">
        <p className="text-xl font-bold">
          Média de avaliações: {media.toFixed(2)}
        </p>
        <FaStar size={16} />
      </div>
      {items.map((item, i) => {
        if (item.status === 'concluida') {
          return (
            <div
              className="flex items-center justify-start p-2 space-x-4"
              key={i}>
              <div className="flex-shrink-0 w-12">
                <img
                  src="/images/avatar_default.png"
                  alt="media"
                  className={`h-12 w-12 shadow-lg rounded-full`}
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="text-lg">{item.comentario}</div>
                <div className="flex flex-row items-center justify-start">
                  <FaBox size={10} className="stroke-current text-gray-300" />
                  <div className="text-gray-300 ml-2 text-base">{item.data}</div>
                </div>
                <div className="flex flex-row items-center justify-start">
                  {[...Array(item.nota)].map(() => <FaStar size={16} />)}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Avaliações;
