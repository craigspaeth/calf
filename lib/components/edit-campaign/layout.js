import { mediumMargin, flatButton, deepOcean, headerHeight } from 'style'
import { view, dom } from 'view'
import header from './header'
import { saveAndQuit, del } from './controller'

const { div, button } = dom
const styles = {
  step: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: headerHeight
  },
  bottomButtons: {
    position: 'absolute',
    bottom: mediumMargin,
    left: mediumMargin
  }
}

export default view(({ step, campaign, enableNextStep, child }) => {
  return div({},
    header({ step, campaign, enableNextStep }),
    div({ style: styles.step }, child({})),
    div({ style: styles.bottomButtons },
      button({
        style: flatButton('dark', { marginRight: '10px' }),
        onClick: () => saveAndQuit(campaign),
        key: 'quit'
      }, 'Save & Quit'),
      campaign.get('_id') && button({
        style: flatButton('light', {
          backgroundColor: 'transparent',
          color: deepOcean
        }),
        onClick: () => del(campaign),
        key: 'delete'
      }, 'Delete')))
})
