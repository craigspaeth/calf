import { mediumMargin, flatButton, deepOcean } from 'style'
import { saveAndQuitCampaign, del } from '../controller'
import { view, dom } from 'view'
import header from './header'
import details from './details'
import targeting from './targeting'
import review from './review'
import adbuilder from './adbuilder'

const { div, button } = dom
const steps = { details, adbuilder, targeting, review }
const styles = {
  step: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: '0px'
  },
  bottomButtons: {
    position: 'absolute',
    bottom: mediumMargin,
    left: mediumMargin
  }
}

export default view((_, { tree }) => {
  const campaign = tree.select('campaign')
  return div({},
    header({}),
    div({ style: styles.step },
      steps[tree.get('step')]({})),
    div({ style: styles.bottomButtons },
      button({
        style: flatButton('dark', { marginRight: '10px' }),
        onClick: () => saveAndQuitCampaign(tree),
        key: 'quit'
      }, 'Save & Quit'),
      campaign.get() && campaign.get()._id && button({
        style: flatButton('light', {
          backgroundColor: 'transparent',
          color: deepOcean
        }),
        onClick: () => del(tree),
        key: 'delete'
      }, 'Delete')))
})
