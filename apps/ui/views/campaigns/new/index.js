import { headerHeight, mediumMargin, flatButton } from 'style'
import { saveAndQuitCampaign } from '../../../controllers/campaigns'
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
  save: flatButton('dark', {
    position: 'absolute',
    bottom: mediumMargin,
    left: mediumMargin
  })
}

export default view((props) => {
  const step = steps[props.tree.get('newCampaignStep')]
  return div({},
    mainheader({}),
    newheader({ newCampaignStep: props.tree.select('newCampaignStep') }),
    div({ style: style.step }, (step || step1)({
      campaign: props.tree.select('newCampaign'),
      tree: props.tree
    })),
    button({
      style: style.save,
      onClick: () => saveAndQuitCampaign()
    }, 'Save & Quit'))
})
