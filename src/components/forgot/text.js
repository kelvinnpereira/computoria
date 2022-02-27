import { useSelector, shallowEqual } from "react-redux";

const Text = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  );
  let { name } = { ...config };
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Bem-vindo a {name}!</p>
      <p className="text-sm font-thin">
        Um sistema de tutoria e monitoria para alunos da Universidade Federal do Amazonas.
      </p>
    </div>
  );
};
export default Text;
