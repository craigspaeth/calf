import { headerHeight, mediumMargin, flatButton, darkGray } from 'style'
import {
  saveAndQuitCampaign,
  deleteCampaign
} from '../../../controllers/campaigns'
import { view, dom } from 'view'
import newheader from './header'
import mainheader from '../../layout/header'
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
import step4 from './step4'

const { div, button } = dom
const steps = [step1, step2, step3, step4]
const style = {
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
  const step = steps[tree.get('editCampaignStep')]
  return div({},
    mainheader({}),
    newheader({ editCampaignStep: tree.select('editCampaignStep') }),
    div({ style: style.step }, (step || step1)({
      campaign: tree.select('editCampaign')
    })),
    div({ style: style.bottomButtons },
      button({
        style: flatButton('dark', { marginRight: '10px' }),
        onClick: () => saveAndQuitCampaign(tree)
      }, 'Save & Quit'),
      button({
        style: flatButton('light', {
          backgroundColor: 'transparent',
          color: darkGray
        }),
        onClick: () => deleteCampaign(tree)
      }, 'Delete')))
})
