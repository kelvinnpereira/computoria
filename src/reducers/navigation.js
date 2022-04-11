import {
  FiCompass
} from "react-icons/fi";

import {
  HiOutlineDocumentSearch
} from "react-icons/hi";

import {
  CgListTree, CgTemplate
} from "react-icons/cg";

import { MdBusiness, MdShowChart } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { ImInsertTemplate } from "react-icons/im";
import { FaRocket } from "react-icons/fa";

const getStorageLevel = () => typeof window !== "undefined" &&
localStorage.getItem("level") ? JSON.parse(
  localStorage.getItem("level")) : {
  tasks: [],
};

const menuLevels = getStorageLevel();

const initialState = [
  {
    title: "Disciplinas",
    items: [
      {
        url: "/especialidade/adicionar",
        icon: <FiCompass size={20}/>,
        title: "Adicionar Especialidade",
      },
      {
        url: "/especialidade/remover",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Remover Especialidade",
      },
      {
        url: "/especialidade/listar",
        icon: <CgTemplate size={20}/>,
        title: "Listar Especialidade",
      },
      {
        url: "/dificuldade/adicionar",
        icon: <CgListTree size={20}/>,
        title: "Adicionar Dificuldade",
      },
      {
        url: "/dificuldade/remover",
        icon: <FaRocket size={20}/>,
        title: "Remover Dificuldade",
      },
      {
        url: "/dificuldade/listar",
        icon: <MdBusiness size={20}/>,
        title: "Listar Dificuldade",
      }
    ]
  },
  {
    title: "Tutores/Monitores",
    items: [
      {
        url: "/tutores",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Listar Tutores/Monitores",
      },
      {
        url: "/tutores_disciplina",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Ranking",
      },
    ]
  },
  {
    title: "Monitoria",
    items: [
      {
        url: "/monitoria/inscrever",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Inscrever Monitoria",
      },
      {
        url: "/monitoria/listar",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Minhas Monitorias",
      },
      {
        url: "/monitoria/solicitacoes",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Solicitações Pendentes",
      },
    ]
  },
  {
    title: "Certificados",
    items: [
      {
        url: "/certificado/solicitar",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Solicitar Certificado",
      },
      {
        url: "/certificado/listar",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Meus Certificados",
      },
      {
        url: "/certificado/solicitacoes",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Solicitações de Certificados",
      },
    ]
  }
];

export default function navigation (state = initialState, action) {
  switch (action.type) {
    case "ADD_MENU_LEVELS": {
      let newState = Array.from(state);
      if (!menuLevels[action.payload.group]?.filter(
        mLevel => mLevel.title === action.payload.title).length) {
        menuLevels[action.payload.group] = menuLevels[action.payload.group] ??
          [];
        menuLevels[action.payload.group].splice(0, 0, {
          url: action.payload.url,
          title: action.payload.title,
          isRemovable: true,
          items: []
        });
      }

      localStorage.setItem("level", JSON.stringify(menuLevels));
      return newState;
    }
    case "REMOVE_MENU_LEVELS": {
      let newState = Array.from(state);
      if (action.payload.index > -1) {
        action.payload.list.splice(action.payload.index, 1);
      }

      localStorage.setItem("level", JSON.stringify(menuLevels));
      return newState;
    }
    default:
      return state;
  }
}
