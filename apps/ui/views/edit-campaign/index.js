import { headerHeight, mediumMargin, flatButton, deepOcean } from 'style'
import {
  saveAndQuitCampaign,
  deleteCampaign
} from '../../controllers/campaigns'
import { view, dom } from 'view'
import header from './header'
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
import step4 from './step4'

const { div, button } = dom
const steps = [step1, step2, step3, step4]
const styles = {
  step: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: `${headerHeight * 2 + mediumMargin}px`,
    left: '0'
  },
  bottomButtons: {
    position: 'absolute',
    bottom: mediumMargin,
    left: mediumMargin
  }
}

export default view(({ tree }) => {
  const editCampaignStep = tree.select('editCampaignStep')
  const step = steps[editCampaignStep.get()]
  const campaign = tree.select('editCampaign')
  return div({},
    header({ editCampaignStep }),
    div({ style: styles.step },
      step({ campaign, channels: tree.select('channels') })),
    div({ style: styles.bottomButtons },
      button({
        style: flatButton('dark', { marginRight: '10px' }),
        onClick: () => saveAndQuitCampaign(tree)
      }, 'Save & Quit'),
      campaign.get() && campaign.get()._id && button({
        style: flatButton('light', {
          backgroundColor: 'transparent',
          color: deepOcean
        }),
        onClick: () => deleteCampaign(tree)
      }, 'Delete')))
})
