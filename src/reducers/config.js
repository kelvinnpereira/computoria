export default function config(
  state = {
    name: 'Computoria',
    description: 'This system is responsible for performing and managing the customization of Requirement team',
    url: 'https://mobilerndhub.sec.samsung.net/wiki/display/SRBR/Automation+Tools+-+Requirement+TG',
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
