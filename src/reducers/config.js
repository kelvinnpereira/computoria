export default function config(
  state = {
    name: 'Computoria',
    description: 'Um sistema de tutoria e monitoria para alunos da Universidade Federal do Amazonas.',
    url: 'https://github.com/kelvinnpereira/computoria',
    layout: 'layout-1',
    collapsed: false,
    rightSidebar: false,
    backdrop: false
  },
  action
) {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.config
      }
    case 'SET_CONFIG_KEY':
      return {
        ...state,
        [`${action.key}`]: action.value
      }
    default:
      return state
  }
}
